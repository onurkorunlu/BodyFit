import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Anasayfa',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
  },
  {
    title: true,
    name: 'İşlemler'
  },

  {
    name: 'Ölçüleri Gir',
    url: '/entry-measurements',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Profil Bilgilerini Gir',
    url: '/profile',
    iconComponent: { name: 'cil-user' },
  },
  {
    title: true,
    name: 'Yardım'
  },
  {
    name: 'Dökümantasyon',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
