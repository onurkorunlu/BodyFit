using BodyFit.Business.Interfaces;
using BodyFit.Core;
using BodyFit.Entities;
using BodyFit.Model.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BodyFit.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class MeasurementController : BodyFitController
    {

        [HttpGet]
        public ActionResult<List<Measurement>> Get()
        {
            try
            {
                var result = AppServiceProvider.Instance.Get<IMeasurementService>().GetAll(this.AuthenticatedUserId);
                result.MeasurementDetails = result.MeasurementDetails.OrderBy(x => x.Date).ToList();
                return Ok(AppServiceProvider.Instance.Get<IMeasurementService>().GetAll(this.AuthenticatedUserId));
            }
            catch (AppException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                var e = new AppException(ReturnMessages.GENERIC_ERROR, ex);
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public ActionResult<Measurement> Update(UpdateMeasurementRequestModel model)
        {
            try
            {
                CheckModelState(model);

                var updateModel = AppServiceProvider.Instance.Get<IMeasurementService>().GetAll(this.AuthenticatedUserId);
                if (updateModel != null)
                {
                    //Fill Here
                    var currentDetail = updateModel.MeasurementDetails.FirstOrDefault(x => x.Date.Date == model.Date.Date);

                    if (currentDetail != null)
                    {
                        currentDetail.Weight = model.Weight;
                        currentDetail.WaistSize = model.WaistSize;
                        currentDetail.EpigastriumSize = model.EpigastriumSize;
                        currentDetail.ButtockSize = model.ButtockSize;
                        currentDetail.HaunchSize = model.HaunchSize;
                        currentDetail.BellySize = model.BellySize;
                        currentDetail.ChestSize = model.ChestSize;
                        currentDetail.NeckSize = model.NeckSize;
                        currentDetail.CalfSize = model.CalfSize;
                        currentDetail.BicepsSize = model.BicepsSize;
                        currentDetail.UnderArm = model.UnderArm;
                    }
                    else
                    {
                        updateModel.MeasurementDetails.Add(new MeasurementDetail
                        {
                            NeckSize = model.NeckSize,
                            ChestSize = model.ChestSize,
                            BellySize = model.BellySize,
                            HaunchSize = model.HaunchSize,
                            ButtockSize = model.ButtockSize,
                            Date = model.Date,
                            EpigastriumSize = model.EpigastriumSize,
                            WaistSize = model.WaistSize,
                            Weight = model.Weight,
                            BicepsSize = model.BicepsSize,
                            CalfSize = model.CalfSize,
                            UnderArm = model.UnderArm
                        });
                    }

                    AppServiceProvider.Instance.Get<IMeasurementService>().Update(updateModel);
                }
                else
                {
                    updateModel = AppServiceProvider.Instance.Get<IMeasurementService>().Create(new Measurement
                    {
                        AppUserId = ObjectId.Parse(this.AuthenticatedUserId),
                        MeasurementDetails = new List<MeasurementDetail>()
                        {
                            new() {
                                NeckSize = model.NeckSize,
                                ChestSize = model.ChestSize,
                                BellySize = model.BellySize,
                                HaunchSize = model.HaunchSize,
                                ButtockSize = model.ButtockSize,
                                Date = model.Date,
                                EpigastriumSize = model.EpigastriumSize,
                                WaistSize = model.WaistSize,
                                Weight = model.Weight,
                                BicepsSize = model.BicepsSize,
                                CalfSize = model.CalfSize,
                                UnderArm = model.UnderArm
                            }
                        }
                    });
                }

                return Ok(updateModel);
            }
            catch (AppException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                var e = new AppException(ReturnMessages.GENERIC_ERROR, ex);
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public ActionResult<Measurement> Delete([FromQuery] string Id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(Id))
                {
                    throw new AppException(ReturnMessages.INVALID_PARAMETER, Id, "Id");
                }

                var deleteModel = AppServiceProvider.Instance.Get<IMeasurementService>().GetById(Id);
                if (deleteModel != null)
                {
                    AppServiceProvider.Instance.Get<IMeasurementService>().DeleteById(Id);
                }
                else
                {
                    throw new AppException(ReturnMessages.ITEM_NOT_FOUND, Id);
                }

                return Ok(deleteModel);
            }
            catch (AppException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                var e = new AppException(ReturnMessages.GENERIC_ERROR, ex);
                return BadRequest(e.Message);
            }
        }

    }
}