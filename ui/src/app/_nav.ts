export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-desktop'
  },
  {
    name: 'Vehicle',
    url: '/vehicle',
    icon: 'fa fa-car',
    authorities: ['vehicle:create', 'vehicle:read', 'vehicle:update', 'vehicle:delete']
  },
  {
    title: true,
    name: 'OTA',
    divider: true
  },
  {
    name: 'OTA',
    url: '/ota',
    icon: 'fa fa-cloud',
    children: [
      {
        name: 'Upload',
        url: '/ota/upload',
        icon: 'fa fa-cloud',
        authorities: ['ota-images:create']
      },
      {
        name: 'Archives',
        url: '/ota/list',
        icon: 'fa fa-cloud',
        authorities: ['ota-images:read', 'ota-images:update', 'ota-images:delete']
      }
    ]
  },
  {
    title: true,
    name: 'IXS',
    divider: true
  },
  {
    name: 'CAN Message',
    url: '/ixs/can-message',
    icon: 'fa fa-envelope',
    authorities: ['message:read']
  },
  {
    title: true,
    name: 'Administration',
    divider: true
  },
  {
    name: 'User',
    url: '/settings/user',
    icon: 'fa fa-users',
    children: [
      {
        name: 'User',
        url: '/settings/user/list',
        icon: 'fa fa-users',
        authorities: ['user:create', 'user:read', 'user:update', 'user:delete']
      },
      {
        name: 'Role',
        url: '/settings/user/role',
        icon: 'fa fa-users',
        authorities: ['role:create', 'role:read', 'role:update', 'role:delete']
      }
    ]
  },
  {
    name: 'Vehicle',
    url: '/settings/vehicle',
    icon: 'fa fa-car',
    children: [
      {
        name: 'Model',
        url: '/settings/vehicle/model',
        icon: 'fa fa-car',
        authorities: ['vehicle-model:create', 'vehicle-model:read', 'vehicle-model:update', 'vehicle-model:delete']
      },
      {
        name: 'Gateway',
        url: '/settings/vehicle/gateway',
        icon: 'fa fa-car',
        authorities: ['vehicle-registry:create', 'vehicle-registry:read', 'vehicle-registry:update', 'vehicle-registry:delete']
      }
    ]
  },
  {
    name: 'Database',
    url: '/settings/database',
    icon: 'fa fa-database',
    children: [
      {
        name: 'Import',
        url: '/settings/database/import',
        icon: 'fa fa-database',
        authorities: ['ie:create']
      },
      {
        name: 'Export',
        url: '/settings/database/export',
        icon: 'fa fa-database',
        authorities: ['ie:read']
      }
    ]
  }
];
