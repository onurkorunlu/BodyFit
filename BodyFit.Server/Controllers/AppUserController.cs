using BodyFit.Business.Interfaces;
using BodyFit.Core;
using BodyFit.Entities;
using BodyFit.Model.RequestModel;
using BodyFit.Model.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BodyFit.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class AppUserController : BodyFitController
    {
        [HttpGet]
        public ActionResult<List<AppUser>> Get()
        {
            try
            {
                return Ok(AppServiceProvider.Instance.Get<IAppUserService>().GetById(this.AuthenticatedUserId));
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
        [AllowAnonymous]
        public ActionResult<LoginResultModel> Login(LoginRequestModel model)
        {
            try
            {
                this.CheckModelState();
                LoginServiceRequestModel requestModel = new LoginServiceRequestModel
                {
                    HttpContext = this.HttpContext,
                    Password = model.Password,
                    Username = model.Username
                };

                var loginResult = AppServiceProvider.Instance.Get<IAppUserService>().TokenBasedLogin(requestModel);

                return Ok(loginResult);
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
        [AllowAnonymous]
        public ActionResult<RegisterResultModel> Register(RegisterRequestModel model)
        {
            try
            {
                this.CheckModelState();
                RegisterServiceRequestModel requestModel = new RegisterServiceRequestModel
                {
                    HttpContext = this.HttpContext,
                    Password = model.Password,
                    Username = model.Username,
                    EmailAddress = model.EmailAddress,
                    DailyActivityType = model.DailyActivityType,
                    TargetWeight = model.TargetWeight,
                    TargetType = model.TargetType,
                    Height = model.Height,
                    ExercisePeriod = model.ExercisePeriod,
                    Age = model.Age,
                    Gender = model.Gender,
                };

                var registerResult = AppServiceProvider.Instance.Get<IAppUserService>().Register(requestModel);

                return Ok(registerResult);
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
        public ActionResult<AppUser> Update(UpdateAppUserRequestModel model)
        {
            try
            {
                CheckModelState(model);

                var updateModel = AppServiceProvider.Instance.Get<IAppUserService>().GetById(this.AuthenticatedUserId);
                if (updateModel != null)
                {
                    //Fill Here
                    updateModel.DailyActivityType = model.DailyActivityType;
                    updateModel.ExercisePeriod = model.ExercisePeriod;
                    updateModel.Height = model.Height;
                    updateModel.TargetType = model.TargetType;
                    updateModel.TargetWeight = model.TargetWeight;
                    updateModel.Gender = model.Gender;
                    updateModel.Age = model.Age;
                    
                    AppServiceProvider.Instance.Get<IAppUserService>().Update(updateModel);
                }
                else
                {
                    throw new AppException(ReturnMessages.ITEM_NOT_FOUND, model);
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
        public ActionResult<AppUser> Delete()
        {
            try
            {

                var deleteModel = AppServiceProvider.Instance.Get<IAppUserService>().GetById(this.AuthenticatedUserId);
                if (deleteModel != null)
                {
                    AppServiceProvider.Instance.Get<IAppUserService>().DeleteById(this.AuthenticatedUserId);
                }
                else
                {
                    throw new AppException(ReturnMessages.ITEM_NOT_FOUND, this.AuthenticatedUserId);
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