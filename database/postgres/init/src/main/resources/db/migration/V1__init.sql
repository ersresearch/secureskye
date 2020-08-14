----------------------------
-- USER ADMIN
----------------------------

create table authority
(
  id          uuid primary key,
  authority   varchar(255) not null,
  description varchar(255) not null
);

create table role
(
  id           uuid primary key,
  display_name varchar(255) not null,
  name         varchar(255) not null,
  is_admin     boolean      not null,
  description  varchar(255) not null
);

create table role_authorities
(
  role_id        uuid not null references role
    on delete cascade,
  authorities_id uuid not null references authority
    on delete cascade,
  primary key (role_id, authorities_id)
);

create table credentials
(
  id              uuid primary key,
  enabled         boolean      not null,
  name            varchar(255) not null unique,
  password        varchar(255) not null,
  version         integer      not null,
  avatar          varchar(512),
  avatar_format   varchar(255) not null,
  first_name      varchar(255) not null,
  last_name       varchar(255) not null,
  email           varchar(255) not null,
  phone_area_code varchar(20)  not null,
  phone_number    varchar(20)  not null,
  gender          boolean      not null,
  birthday        date         not null,
  nationality     varchar(255) not null,
  address         varchar(255) not null
);

create table credentials_roles
(
  users_id uuid not null references credentials
    on delete cascade,
  roles_id uuid not null references role
    on delete cascade,
  primary key (users_id, roles_id)
);

create table additional_info
(
  id             uuid primary key,
  credentials_id uuid         not null references credentials
    on delete cascade,
  key            varchar(255) not null,
  value          varchar(255) not null
);

create table attachment
(
  id             uuid primary key,
  credentials_id uuid         not null references credentials,
  file_id        varchar(24)  not null,
  file_name      varchar(255) not null
);

create table user_settings_units
(
  id          uuid primary key references credentials
    on delete cascade,
  length      integer not null,
  mass        integer not null,
  temperature integer not null
);

----------------------------
-- OAUTH
----------------------------

create table oauth_access_token
(
  token_id          varchar(256),
  token             bytea,
  authentication_id varchar(256) primary key,
  user_name         varchar(256),
  client_id         varchar(256),
  authentication    bytea,
  refresh_token     varchar(256)
);

create table oauth_approvals
(
  userid         varchar(256),
  clientid       varchar(256),
  scope          varchar(256),
  status         varchar(10),
  expiresat      timestamp,
  lastmodifiedat timestamp
);

create table oauth_client_details
(
  client_id               varchar(256) primary key,
  resource_ids            varchar(8192),
  client_secret           varchar(256),
  scope                   varchar(8192),
  authorized_grant_types  varchar(256),
  web_server_redirect_uri varchar(256),
  authorities             varchar(1000),
  access_token_validity   integer,
  refresh_token_validity  integer,
  additional_information  varchar(4096),
  autoapprove             varchar(256)
);

create table oauth_client_token
(
  token_id          varchar(256),
  token             bytea,
  authentication_id varchar(256) primary key,
  user_name         varchar(256),
  client_id         varchar(256)
);

create table oauth_code
(
  code           varchar(256),
  authentication bytea
);

create table oauth_refresh_token
(
  token_id       varchar(256),
  token          bytea,
  authentication bytea
);

create table oauth_totp
(
  oauth_id       varchar(256) primary key,
  oauth_group    varchar(256),
  secret         varchar(25) not null,
  recovery_code1 integer     not null,
  recovery_code2 integer     not null,
  recovery_code3 integer     not null,
  recovery_code4 integer     not null,
  recovery_code5 integer     not null,
  enabled        boolean     not null
);

create index oauth_totp_group_idx
  on oauth_totp (oauth_group);

create table oauth_totp_access
(
  oauth_id   varchar(256) not null,
  access_id  uuid         not null,
  expires_at timestamp    not null,
  primary key (oauth_id, access_id)
);

----------------------------
-- VEHICLE ADMIN
----------------------------

create table vehicle_maker
(
  id   uuid         not null
    constraint vehicle_maker_pkey
      primary key,
  name varchar(255) not null
);

create table vehicle_model
(
  id       uuid primary key,
  name     varchar(255) not null,
  maker_id uuid         not null references vehicle_maker
    on delete cascade,
  body     integer      not null
);

create table model_display_settings
(
  id       uuid primary key,
  settings integer not null,
  value    boolean not null,
  model_id uuid    not null references vehicle_model
    on delete cascade
);

create table vehicle
(
  id           uuid primary key,
  client_id    varchar(255) not null,
  name         varchar(255) not null,
  model_id     uuid         not null references vehicle_model,
  vin          varchar(255) not null unique,
  color        varchar(255) not null,
  image_id     varchar(24)  not null,
  update_count integer      not null,
  deleted      boolean      not null
);

create table vehicle_alert_count
(
  id         uuid primary key,
  vehicle_id uuid    not null references vehicle,
  danger     integer not null,
  warning    integer not null,
  info       integer not null
);

create table vehicle_component_alert
(
  id             uuid primary key,
  vehicle_id     uuid         not null references vehicle
    on delete cascade,
  component_type integer      not null,
  alert_type     integer      not null,
  alert_status   integer      not null,
  timestamp      timestamp    not null,
  detail_info    varchar(255) not null
);

create table vehicle_connection
(
  id                       uuid primary key,
  vehicle_id               uuid         not null references vehicle
    on delete cascade,
  connected                boolean      not null,
  connected_timestamp      timestamp    not null,
  disconnected_timestamp   timestamp    not null,
  ip_address               varchar(255) not null,
  status                   integer      not null,
  last_receiving_timestamp timestamp    not null
);

----------------------------
-- VEHICLE REGISTRY
----------------------------

create table vehicle_registry_code_info
(
  id     uuid primary key,
  code   bigint       not null,
  detail varchar(255) not null
);

create table vehicle_registry_error_code_info
(
  id             uuid primary key,
  ips_version    varchar(255) not null,
  rule_db_status integer      not null,
  error_count    bigint       not null
);

create table vehicle_registry_error_code_info_error_codes
(
  error_code_info_id uuid not null references vehicle_registry_error_code_info
    on delete cascade,
  error_codes_id     uuid not null references vehicle_registry_code_info
    on delete cascade,
  primary key (error_code_info_id, error_codes_id)
);

create table ecu
(
  id              uuid primary key,
  type            integer          not null,
  display_name    varchar(255)     not null,
  ecu_device_id   varchar(255)     not null,
  comm_protocol   integer          not null,
  message_id      varchar(255)     not null,
  vehicle_id      uuid             not null references vehicle
    on delete cascade,
  ip              varchar(255)     not null,
  vin             varchar(255)     not null,
  error_code_id   uuid             not null references vehicle_registry_error_code_info
    on delete cascade,
  parent_id       uuid references ecu
    on delete cascade,
  top_position    double precision not null,
  left_position   double precision not null,
  security_status integer          not null
);

create table ecu_alert
(
  id           uuid primary key,
  ecu_id       uuid             not null references ecu
    on delete cascade,
  vehicle_id   uuid             not null references vehicle
    on delete cascade,
  latitude     double precision not null,
  longitude    double precision not null,
  alert_title  varchar(255)     not null,
  detail_alert varchar(255)     not null,
  alert_type   integer          not null,
  alert_status integer          not null,
  timestamp    timestamp        not null
);

create table ecu_software
(
  id          uuid primary key,
  name        varchar(255) not null,
  description varchar(255) not null
);

create table ecu_software_version
(
  id              uuid primary key,
  software_id     uuid          not null references ecu_software,
  ecu_device_id   varchar(255)  not null,
  version_code    bigint        not null,
  version_name    varchar(255)  not null,
  available_since timestamp     not null,
  changelog       varchar(3000) not null,
  image_id        varchar(24)   not null,
  unique (software_id, ecu_device_id, version_code),
  unique (software_id, ecu_device_id, version_name)
);

create index ecu_software_version_software_id_idx
  on ecu_software_version (software_id);

create table ecu_software_installation
(
  id                       uuid primary key,
  ecu_id                   uuid         not null references ecu
    on delete cascade,
  software_id              uuid         not null references ecu_software
    on delete cascade,
  software_version_id      uuid         not null references ecu_software_version
    on delete cascade,
  status                   integer      not null,
  message                  varchar(255) not null,
  last_modified            timestamp    not null,
  active                   boolean      not null,
  previous_installation_id uuid references ecu_software_installation
);

----------------------------
-- OBD2 DEVICES
----------------------------

create table obd2device
(
  id          uuid primary key,
  family      varchar(255) not null,
  kernel      varchar(255) not null,
  mac_address varchar(255) not null,
  client_id   varchar(100) not null,
  vehicle_id  uuid references vehicle
);

----------------------------
-- SECURITY SETTINGS
----------------------------

create table security_software
(
  id          uuid primary key,
  name        varchar(255) not null,
  description varchar(255) not null
);

create table security_setting
(
  id                   uuid primary key,
  name                 varchar(255) not null,
  description          varchar(255) not null,
  security_software_id uuid         not null references security_software
    on delete cascade
);

create table vehicle_security_config
(
  id                   uuid primary key,
  is_active            boolean not null,
  vehicle_id           uuid    not null references vehicle
    on delete cascade,
  security_software_id uuid    not null references security_software
    on delete cascade,
  unique (vehicle_id, security_software_id)
);

create table security_setting_config
(
  id                         uuid primary key,
  is_active                  boolean not null,
  vehicle_security_config_id uuid    not null references vehicle_security_config
    on delete cascade,
  security_setting_id        uuid    not null references security_setting
    on delete cascade
);

----------------------------
-- IMPORT/EXPORT
----------------------------

create table metric
(
  id          uuid primary key,
  export_date timestamp     not null,
  format      varchar(255)  not null,
  hash        varchar(255)  not null,
  user_info   varchar(4096) not null
);

----------------------------
-- NOTIFICATION
----------------------------

create table notification_channel
(
  id          uuid primary key,
  type        integer       not null,
  name        varchar(255)  not null,
  description varchar(1000) not null
);

create table notification_topic
(
  id             uuid primary key,
  name           varchar(255)  not null,
  description    varchar(1000) not null,
  subject_prefix varchar(25)   not null
);

create table notification_subscription
(
  user_id    uuid not null references credentials
    on delete cascade,
  topic_id   uuid not null references notification_topic
    on delete cascade,
  channel_id uuid not null references notification_channel
    on delete cascade,
  primary key (user_id, topic_id, channel_id)
);

----------------------------
-- INSERTS
----------------------------

INSERT INTO authority (id, authority, description)
VALUES ('f7dc2c1b-7b32-4cb2-b79e-137019e738cb', 'ie:read', 'Import export database');
INSERT INTO authority (id, authority, description)
VALUES ('79c61d91-53b5-4ac3-b4e9-56cf0a1f209a', 'ie:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('c83641b6-d14f-4824-99da-583a89e36105', 'notification:create',
        'Send notification to users via various channels');
INSERT INTO authority (id, authority, description)
VALUES ('ca903993-dc3f-441a-879f-9d191d1f053f', 'uaa:read', 'Access and manage OAuth2 clients');
INSERT INTO authority (id, authority, description)
VALUES ('4fbf0120-6757-4ab0-96c8-572c81d6bc01', 'uaa:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('5ae293a5-d379-49a4-900e-77e4141a6339', 'uaa:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('efbbe384-1619-44a5-9990-22583699d119', 'uaa:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('a76311d5-5558-4dc2-8d9f-1fe0e4cfb0e8', 'ota-images:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('c95408e9-4348-488a-8b35-bed5468abb40', 'ota-images:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('20ccf22d-57b9-4b28-97c6-b144c2325047', 'ota-images:read', 'Upload, publish and manage OTA packages');
INSERT INTO authority (id, authority, description)
VALUES ('20ccf22d-57b9-4b28-97c6-b144c2325099', 'ota-images:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('77f74eee-18dd-4a94-9817-abfe1da0ce8b', 'user:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('876b87f5-7642-4b3a-a0a3-8672ed5c1918', 'user:read', 'Access and manage users'' info');
INSERT INTO authority (id, authority, description)
VALUES ('247aaf29-665a-4b33-b3f5-0b2d76bb5eae', 'user:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('db3b6fb9-d38b-447d-83cb-14a0c12875b6', 'user:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('ef83f411-99c0-45d0-8052-c58395f663c9', 'authority:read', 'Access to authorities list (this list)');
INSERT INTO authority (id, authority, description)
VALUES ('83656d66-befc-4466-81eb-c847686af998', 'role:read', 'Access and manage user groups (roles)');
INSERT INTO authority (id, authority, description)
VALUES ('5ffefca4-7ee4-4b0b-89c0-05e53c39f95e', 'role:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('514a8251-767e-4198-9b06-4bf3263165fa', 'role:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('cfa88690-c1ed-43f4-83e0-a7d40f567b15', 'role:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('6a837f56-172f-4306-b13c-367ecce86d09', 'vehicle-body-type:read',
        'Access and manage supported vehicle body types');
INSERT INTO authority (id, authority, description)
VALUES ('5b385bf0-6ca1-4314-935c-19c6c2118aef', 'vehicle-model:read', 'Access and manage supported vehicle models');
INSERT INTO authority (id, authority, description)
VALUES ('c90c7f19-6b8a-4dc1-95b5-7e73d010401b', 'vehicle-model:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('efa40054-da7b-4303-8ded-8fa2af826a44', 'vehicle-model:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('d84e07cc-78c2-44ea-9078-873296be12ca', 'vehicle-model:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('352d0d8b-e23e-4553-b768-ae81cb3c447c', 'vehicle:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('15da9f3d-092d-4ddc-bbed-f4b811d75ead', 'vehicle:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('f89d633b-cc28-4bd0-8758-1d7a17c98213', 'vehicle:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('c169e6ce-93d0-40b6-af84-41feab77e3ca', 'vehicle:read', 'Access and manage connected vehicles');
INSERT INTO authority (id, authority, description)
VALUES ('d5f850b6-0439-439a-aef4-e90ed6f16b26', 'vehicle-status:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('626b95b1-61fc-4d1c-b028-f8850cd0b73b', 'event:read', 'Send and receive vehicles'' events');
INSERT INTO authority (id, authority, description)
VALUES ('25f3f1df-dbf8-42de-8d3a-24ba8f1a04a4', 'event:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('feb2dd25-6186-4d36-b150-9d5da185e4c2', 'message:read', 'Send and receive vehicle''s messages');
INSERT INTO authority (id, authority, description)
VALUES ('bebdea26-f3d1-47ef-adeb-72c26c128037', 'message:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('fc9d2ebf-1335-4bc2-8fd4-505992540956', 'route:read', 'Access to vehicle''s route tracking feature');
INSERT INTO authority (id, authority, description)
VALUES ('57ee6c61-4b1c-4bd4-810e-1ace4473fb59', 'route:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('f8421259-0512-49ed-9047-da6711c1f54d', 'route:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('1341728f-44f2-4590-95fc-350e330288ca', 'route:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('8550fdf0-487d-4361-a6ba-74673d426398', 'software-install:create', 'Add, remove or manage software on ECUs');
INSERT INTO authority (id, authority, description)
VALUES ('67356ee8-94d6-43ab-ab6f-09a625ca57d5', 'software-install:read', 'Add, remove or manage software on ECUs');
INSERT INTO authority (id, authority, description)
VALUES ('1baebcb1-fcf9-48e7-8f36-cc5a6bdaa902', 'software-install:update', 'Add, remove or manage software on ECUs');
INSERT INTO authority (id, authority, description)
VALUES ('16b2ef00-99fe-4889-9772-ed75c7533d31', 'software-install:delete', 'Add, remove or manage software on ECUs');
INSERT INTO authority (id, authority, description)
VALUES ('88a0a4b9-5834-44ce-840f-82b498e79cfc', 'software:create', 'Manage software and its versions');
INSERT INTO authority (id, authority, description)
VALUES ('80ec901b-3587-49ef-9d0e-07b3bd83daae', 'software:read', 'Manage software and its versions');
INSERT INTO authority (id, authority, description)
VALUES ('d611ba37-81e0-4524-9358-c054b10b37d6', 'software:update', 'Manage software and its versions');
INSERT INTO authority (id, authority, description)
VALUES ('62085474-7161-4b2c-b9e6-274d1b93c8ec', 'software:delete', 'Manage software and its versions');
INSERT INTO authority (id, authority, description)
VALUES ('2a8308c6-d4a1-44ef-86fe-a1196393c312', 'vehicle-registry:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('96efb934-1cd0-4531-a934-676b33c9c668', 'vehicle-registry:read',
        'Access and manage vehicles'' gateway, ecu info');
INSERT INTO authority (id, authority, description)
VALUES ('2041db3a-0edf-4679-acc2-11a7a68f73b9', 'vehicle-registry:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('14a05d25-a28f-4ed5-bca6-52c92627bdff', 'vehicle-registry:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('66578d82-fc4d-443c-b170-5007242b5c29', 'subscription:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('41c0d1fd-e39f-4fb4-82b6-8f646f2c45c6', 'subscription:read', 'Access to notification subscription feature');
INSERT INTO authority (id, authority, description)
VALUES ('69e7d514-65a9-4239-a0d0-d5b2a8d1ce16', 'subscription:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('3e377429-43f5-48d0-b078-dbd617309cb6', '2fa:read', 'Access to 2-Factor authentication feature');
INSERT INTO authority (id, authority, description)
VALUES ('7a148925-8104-4b8b-82be-b55b396987bf', '2fa:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('ba4dac25-2f28-45d4-b902-35c5146f7c76', '2fa:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('a9fefec9-e8ae-46b9-baa9-5218d77334c1', '2fa:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('96d8ef17-25d7-4f8c-bab7-1e4fc1732734', 'user-settings:read', '');
INSERT INTO authority (id, authority, description)
VALUES ('f6e668ff-2af1-4837-9bc5-83e26f3f98f5', 'user-settings:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('14c5edbf-9fe3-4e69-9861-46f012bcc86e', 'user-settings:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('d9a12075-52d5-448a-b43a-03f96ac91fb0', 'obd2device-admin:read', 'Access and manage OBD-II device info');
INSERT INTO authority (id, authority, description)
VALUES ('f10e6549-7693-48a4-a52d-fa93a1253ddd', 'obd2device-admin:create', '');
INSERT INTO authority (id, authority, description)
VALUES ('9b8a0d1b-a2b1-4d0c-9393-7b6533644fe0', 'obd2device-admin:update', '');
INSERT INTO authority (id, authority, description)
VALUES ('de21ee09-67c6-46ba-bc37-b77ce3294d08', 'obd2device-admin:delete', '');
INSERT INTO authority (id, authority, description)
VALUES ('bcfd805d-3deb-4eed-86d5-6c0ebe3284fc', 'obd2device-event:create', 'Access and manage OBD-II device''s event');
INSERT INTO authority (id, authority, description)
VALUES ('72fa297c-9ab4-4153-b9fa-9e6e14c45bc9', 'obd2device-event:read', 'Access and manage OBD-II device''s event');


INSERT INTO role (id, name, display_name, is_admin, description)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'ROLE_ADMIN', 'Admin', true, 'ADMIN_Description');
INSERT INTO role (id, name, display_name, is_admin, description)
VALUES ('96a41d3e-9b79-4d8b-a2e9-e4966016dc5e', 'ROLE_USER', 'User', false, 'USER_Description');


INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'f7dc2c1b-7b32-4cb2-b79e-137019e738cb');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '79c61d91-53b5-4ac3-b4e9-56cf0a1f209a');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'a76311d5-5558-4dc2-8d9f-1fe0e4cfb0e8');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'c83641b6-d14f-4824-99da-583a89e36105');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'ca903993-dc3f-441a-879f-9d191d1f053f');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '4fbf0120-6757-4ab0-96c8-572c81d6bc01');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '5ae293a5-d379-49a4-900e-77e4141a6339');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'efbbe384-1619-44a5-9990-22583699d119');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'c95408e9-4348-488a-8b35-bed5468abb40');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '20ccf22d-57b9-4b28-97c6-b144c2325047');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '77f74eee-18dd-4a94-9817-abfe1da0ce8b');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '876b87f5-7642-4b3a-a0a3-8672ed5c1918');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '247aaf29-665a-4b33-b3f5-0b2d76bb5eae');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'db3b6fb9-d38b-447d-83cb-14a0c12875b6');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'ef83f411-99c0-45d0-8052-c58395f663c9');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '83656d66-befc-4466-81eb-c847686af998');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '5ffefca4-7ee4-4b0b-89c0-05e53c39f95e');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '6a837f56-172f-4306-b13c-367ecce86d09');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '5b385bf0-6ca1-4314-935c-19c6c2118aef');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'c90c7f19-6b8a-4dc1-95b5-7e73d010401b');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'efa40054-da7b-4303-8ded-8fa2af826a44');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'd84e07cc-78c2-44ea-9078-873296be12ca');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '352d0d8b-e23e-4553-b768-ae81cb3c447c');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '15da9f3d-092d-4ddc-bbed-f4b811d75ead');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'f89d633b-cc28-4bd0-8758-1d7a17c98213');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'c169e6ce-93d0-40b6-af84-41feab77e3ca');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'd5f850b6-0439-439a-aef4-e90ed6f16b26');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '626b95b1-61fc-4d1c-b028-f8850cd0b73b');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '25f3f1df-dbf8-42de-8d3a-24ba8f1a04a4');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'feb2dd25-6186-4d36-b150-9d5da185e4c2');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'bebdea26-f3d1-47ef-adeb-72c26c128037');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'fc9d2ebf-1335-4bc2-8fd4-505992540956');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '57ee6c61-4b1c-4bd4-810e-1ace4473fb59');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '8550fdf0-487d-4361-a6ba-74673d426398');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '67356ee8-94d6-43ab-ab6f-09a625ca57d5');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '1baebcb1-fcf9-48e7-8f36-cc5a6bdaa902');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '16b2ef00-99fe-4889-9772-ed75c7533d31');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '88a0a4b9-5834-44ce-840f-82b498e79cfc');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '80ec901b-3587-49ef-9d0e-07b3bd83daae');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'd611ba37-81e0-4524-9358-c054b10b37d6');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '62085474-7161-4b2c-b9e6-274d1b93c8ec');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '2a8308c6-d4a1-44ef-86fe-a1196393c312');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '96efb934-1cd0-4531-a934-676b33c9c668');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '2041db3a-0edf-4679-acc2-11a7a68f73b9');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '14a05d25-a28f-4ed5-bca6-52c92627bdff');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '66578d82-fc4d-443c-b170-5007242b5c29');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '41c0d1fd-e39f-4fb4-82b6-8f646f2c45c6');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '69e7d514-65a9-4239-a0d0-d5b2a8d1ce16');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '20ccf22d-57b9-4b28-97c6-b144c2325099');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '3e377429-43f5-48d0-b078-dbd617309cb6');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '7a148925-8104-4b8b-82be-b55b396987bf');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '514a8251-767e-4198-9b06-4bf3263165fa');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'cfa88690-c1ed-43f4-83e0-a7d40f567b15');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'f8421259-0512-49ed-9047-da6711c1f54d');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '1341728f-44f2-4590-95fc-350e330288ca');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'ba4dac25-2f28-45d4-b902-35c5146f7c76');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'a9fefec9-e8ae-46b9-baa9-5218d77334c1');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '96d8ef17-25d7-4f8c-bab7-1e4fc1732734');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'f6e668ff-2af1-4837-9bc5-83e26f3f98f5');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '14c5edbf-9fe3-4e69-9861-46f012bcc86e');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'd9a12075-52d5-448a-b43a-03f96ac91fb0');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'f10e6549-7693-48a4-a52d-fa93a1253ddd');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '9b8a0d1b-a2b1-4d0c-9393-7b6533644fe0');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'de21ee09-67c6-46ba-bc37-b77ce3294d08');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', 'bcfd805d-3deb-4eed-86d5-6c0ebe3284fc');
INSERT INTO role_authorities (role_id, authorities_id)
VALUES ('5b85684e-1f2f-49b5-8824-cd14aed37de1', '72fa297c-9ab4-4153-b9fa-9e6e14c45bc9');


INSERT INTO credentials (id, enabled, name, password, version, avatar, avatar_format, first_name, last_name,
                         email, phone_area_code, phone_number, gender, birthday, nationality, address)
VALUES ('0dc0fa48-f5e2-11e7-8c3f-9a214cf093ae', true, 'admin',
        '$2a$10$qK8dGiKrhXPLzI3TqjGnJuqnDk2oR0fHlVM477vfswmhbfKex0PqS', 0, null, '', 'I', 'Admin',
        'admin@trillium.co.jp', '84', '123456789', true, '1990-01-01', 'Japan', 'Tokyo');
INSERT INTO credentials (id, enabled, name, password, version, avatar, avatar_format, first_name, last_name,
                         email, phone_area_code, phone_number, gender, birthday, nationality, address)
VALUES ('0dc0fe08-f5e2-11e7-8c3f-9a214cf093ae', true, 'car_user',
        '$2a$10$GQtLPBdx/rvzN8Fs/mv/F.qfCeOIcSYmA8rQpzSHeLFT.2KvkiNba', 0, null, '', 'Car', 'User',
        'car_user@trillium.co.jp', '84', '123456789', true, '1990-01-01', 'Japan', 'Tokyo');
INSERT INTO credentials (id, enabled, name, password, version, avatar, avatar_format, first_name, last_name,
                         email, phone_area_code, phone_number, gender, birthday, nationality, address)
VALUES ('0dc0ff8e-f5e2-11e7-8c3f-9a214cf093ae', true, 'user',
        '$2a$10$Tcs8X8CSRLIhwQKslIjkxuxyAQ/BIzmJH9Kj6SX0yWTy4IFURXjuO', 0, null, '', 'I', 'User', 'user@trillium.co.jp',
        '84', '123456789', true, '1990-01-01', 'Japan', 'Tokyo');


INSERT INTO credentials_roles (users_id, roles_id)
VALUES ('0dc0fa48-f5e2-11e7-8c3f-9a214cf093ae', '5b85684e-1f2f-49b5-8824-cd14aed37de1');
INSERT INTO credentials_roles (users_id, roles_id)
VALUES ('0dc0fe08-f5e2-11e7-8c3f-9a214cf093ae', '96a41d3e-9b79-4d8b-a2e9-e4966016dc5e');
INSERT INTO credentials_roles (users_id, roles_id)
VALUES ('0dc0ff8e-f5e2-11e7-8c3f-9a214cf093ae', '96a41d3e-9b79-4d8b-a2e9-e4966016dc5e');


INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('securecar', 'secureskye-car-services,vehicle-message',
        '$2a$10$ntaYBWh5acLYoho9kgvpGey2wDkmwo1KggDwlHA2gNMxskilv04KO', 'none',
        'implicit,client_credentials,refresh_token', 'https://localhost',
        'event:create,event:read,message:create,message:read,route:create,route:read,route:update,route:delete', 86400,
        0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-webapp-client',
        'uaa,secureskye-device-services,secureskye-car-services,secureskye-test-services,vehicle-admin,vehicle-message,ixs-main,ota-vehicle,ie-main,user-admin,notification-main,vehicle-registry,licensing-main,user-settings,obd2device-admin,obd2device-event',
        '$2a$10$MLiYDmsYQgwzHm65btSdVezrbMunb5VOMyLVHVKesjgdvxdWDAooi', 'all', 'implicit,password,refresh_token',
        'https://localhost', null, 86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-vehicle-message-service',
        'vehicle-admin,obd2device-admin,obd2device-event,vehicle-message,vehicle-registry',
        '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none', 'client_credentials', null,
        'vehicle:read,vehicle-status:update,event:read,obd2device-admin:read,event:create,vehicle-registry:read', 86400,
        0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-vehicle-registry-service', 'vehicle-admin,ota-vehicle',
        '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none', 'client_credentials', null,
        'vehicle:read,ota-images:update', 86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-notification-service', 'user-admin', '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly',
        'none', 'client_credentials', null, 'user:read', 86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-ie-service', 'notification-main', '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly',
        'none', 'client_credentials', null, 'notification:read', 86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-ota-service', 'vehicle-admin,vehicle-registry',
        '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none', 'client_credentials', null,
        'vehicle:read,software:create', 86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('third_party_test_app', 'user-admin', '$2a$10$MLiYDmsYQgwzHm65btSdVezrbMunb5VOMyLVHVKesjgdvxdWDAooi',
        'user_attribute_read', 'implicit,authorization_code,refresh_token', 'https://localhost', null, 86400, 0, null,
        null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-user-admin-service', 'uaa', '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none',
        'client_credentials', null, '2fa:read,2fa:delete', 86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-user-settings-service', 'user-admin',
        '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none', 'client_credentials', null, 'user:read',
        86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-obd2device-admin-service', 'vehicle-admin',
        '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none', 'client_credentials', null,
        'vehicle:read', 86400, 0, null, null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-obd2device-event-service', 'obd2device-admin,vehicle-admin,vehicle-message,vehicle-model',
        '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none', 'client_credentials', null,
        'obd2device-admin:read,vehicle-status:update,event:create,vehicle:read,vehicle-model:read', 86400, 0, null,
        null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('secureskye-vehicle-admin-service', 'uaa,vehicle-registry,obd2device-admin',
        '$2a$10$gFM6nPOWJnkJPFdGKPPPveAO.3JIpI93rSVgFItd4UC3IAtcNqbly', 'none', 'client_credentials', null,
        '2fa:read,2fa:create,2fa:update,2fa:delete,vehicle-registry:delete,obd2device-admin:delete', 86400, 0, null,
        null);
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('vehicle-db85ba27-f9f8-11e8-8f75-0242ac15000c',
        'uaa,vehicle-message,vehicle-registry,ota-vehicle,obd2device-admin', null, 'none', 'client_credentials', null,
        'event:create,message:create,ota-images:read,software:read,software-install:create,software-install:read,software-install:update,software-install:delete,vehicle-registry:create,vehicle-registry:read,vehicle-registry:update,vehicle-registry:delete,vehicle-status:update,obd2device-admin:read,obd2device-admin:update,obd2device-admin:delete',
        360, 0, '{}', '');
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('vehicle-dca0c744-f9f8-11e8-8f75-0242ac15000c',
        'uaa,vehicle-message,vehicle-registry,ota-vehicle,obd2device-admin', null, 'none', 'client_credentials', null,
        'event:create,message:create,ota-images:read,software:read,software-install:create,software-install:read,software-install:update,software-install:delete,vehicle-registry:create,vehicle-registry:read,vehicle-registry:update,vehicle-registry:delete,vehicle-status:update,obd2device-admin:read,obd2device-admin:update,obd2device-admin:delete',
        360, 0, '{}', '');
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('obd2device-e3d6f117-f9f8-11e8-8a56-0242ac15000d', 'uaa,vehicle-message,obd2device-event', null, 'none',
        'client_credentials', null, 'event:create,message:create,vehicle-status:update,vehicle:read', 86400, 0, '{}',
        '');
INSERT INTO oauth_client_details (client_id, resource_ids, client_secret, scope, authorized_grant_types,
                                  web_server_redirect_uri, authorities, access_token_validity,
                                  refresh_token_validity, additional_information, autoapprove)
VALUES ('obd2device-e3e94099-f9f8-11e8-8a56-0242ac15000d', 'uaa,vehicle-message,obd2device-event', null, 'none',
        'client_credentials', null, 'event:create,message:create,vehicle-status:update,vehicle:read', 86400, 0, '{}',
        '');


INSERT INTO vehicle_maker (id, name)
VALUES ('db1a2802-f9f8-11e8-8f75-0242ac15000c', 'Toyota');
INSERT INTO vehicle_maker (id, name)
VALUES ('dc69d8af-f9f8-11e8-8f75-0242ac15000c', 'Volkswagen');


INSERT INTO vehicle_model (id, name, maker_id, body)
VALUES ('db4b7133-f9f8-11e8-8f75-0242ac15000c', 'Prius', 'db1a2802-f9f8-11e8-8f75-0242ac15000c', 8);
INSERT INTO vehicle_model (id, name, maker_id, body)
VALUES ('dc774630-f9f8-11e8-8f75-0242ac15000c', 'Touareg', 'dc69d8af-f9f8-11e8-8f75-0242ac15000c', 4);


INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db5200e4-f9f8-11e8-8f75-0242ac15000c', 2, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db5471e5-f9f8-11e8-8f75-0242ac15000c', 3, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db5709f6-f9f8-11e8-8f75-0242ac15000c', 4, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db584277-f9f8-11e8-8f75-0242ac15000c', 5, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db5b76c8-f9f8-11e8-8f75-0242ac15000c', 6, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db5f6e69-f9f8-11e8-8f75-0242ac15000c', 7, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db60cdfa-f9f8-11e8-8f75-0242ac15000c', 8, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db62067b-f9f8-11e8-8f75-0242ac15000c', 9, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db62c9cc-f9f8-11e8-8f75-0242ac15000c', 10, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db675dad-f9f8-11e8-8f75-0242ac15000c', 11, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db68e44e-f9f8-11e8-8f75-0242ac15000c', 12, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db6a6aef-f9f8-11e8-8f75-0242ac15000c', 13, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db6cb3e0-f9f8-11e8-8f75-0242ac15000c', 14, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db6e6191-f9f8-11e8-8f75-0242ac15000c', 15, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db7120b2-f9f8-11e8-8f75-0242ac15000c', 16, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db728043-f9f8-11e8-8f75-0242ac15000c', 17, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db745504-f9f8-11e8-8f75-0242ac15000c', 18, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db758d85-f9f8-11e8-8f75-0242ac15000c', 19, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('db7650d6-f9f8-11e8-8f75-0242ac15000c', 20, true, 'db4b7133-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc78ccd1-f9f8-11e8-8f75-0242ac15000c', 2, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc79b732-f9f8-11e8-8f75-0242ac15000c', 3, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc7c0123-f9f8-11e8-8f75-0242ac15000c', 4, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc7f3574-f9f8-11e8-8f75-0242ac15000c', 5, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc801fd5-f9f8-11e8-8f75-0242ac15000c', 6, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc817f66-f9f8-11e8-8f75-0242ac15000c', 7, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc832d17-f9f8-11e8-8f75-0242ac15000c', 8, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc854ff8-f9f8-11e8-8f75-0242ac15000c', 9, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc861349-f9f8-11e8-8f75-0242ac15000c', 10, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc885d3a-f9f8-11e8-8f75-0242ac15000c', 11, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc8a31fb-f9f8-11e8-8f75-0242ac15000c', 12, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc8b1c5c-f9f8-11e8-8f75-0242ac15000c', 13, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc8b6a7d-f9f8-11e8-8f75-0242ac15000c', 14, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc8e299e-f9f8-11e8-8f75-0242ac15000c', 15, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc909a9f-f9f8-11e8-8f75-0242ac15000c', 16, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc929670-f9f8-11e8-8f75-0242ac15000c', 17, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc941d11-f9f8-11e8-8f75-0242ac15000c', 18, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc968e12-f9f8-11e8-8f75-0242ac15000c', 19, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO model_display_settings (id, settings, value, model_id)
VALUES ('dc983bc3-f9f8-11e8-8f75-0242ac15000c', 20, true, 'dc774630-f9f8-11e8-8f75-0242ac15000c');


INSERT INTO vehicle (id, client_id, name, model_id, vin, color, image_id, update_count, deleted)
VALUES ('dba7e828-f9f8-11e8-8f75-0242ac15000c', 'vehicle-db85ba27-f9f8-11e8-8f75-0242ac15000c', 'My Prius',
        'db4b7133-f9f8-11e8-8f75-0242ac15000c', '---00000000000000', 'Sea Glass Pearl', '', 0,
        false);
INSERT INTO vehicle (id, client_id, name, model_id, vin, color, image_id, update_count, deleted)
VALUES ('dca13c75-f9f8-11e8-8f75-0242ac15000c', 'vehicle-dca0c744-f9f8-11e8-8f75-0242ac15000c', 'My Touareg',
        'dc774630-f9f8-11e8-8f75-0242ac15000c', '---00000000000001', 'Metallic Silver', '', 0,
        false);


INSERT INTO vehicle_alert_count (id, vehicle_id, danger, warning, info)
VALUES ('dbc35f6a-f9f8-11e8-8f75-0242ac15000c', 'dba7e828-f9f8-11e8-8f75-0242ac15000c', 0, 0, 0);
INSERT INTO vehicle_alert_count (id, vehicle_id, danger, warning, info)
VALUES ('dca61e77-f9f8-11e8-8f75-0242ac15000c', 'dca13c75-f9f8-11e8-8f75-0242ac15000c', 0, 0, 0);


INSERT INTO vehicle_connection (id, vehicle_id, connected, connected_timestamp, disconnected_timestamp,
                                ip_address, status, last_receiving_timestamp)
VALUES ('dbb44439-f9f8-11e8-8f75-0242ac15000c', 'dba7e828-f9f8-11e8-8f75-0242ac15000c', false, to_timestamp(0),
        to_timestamp(0), '0.0.0.0', 0, to_timestamp(0));
INSERT INTO vehicle_connection (id, vehicle_id, connected, connected_timestamp, disconnected_timestamp,
                                ip_address, status, last_receiving_timestamp)
VALUES ('dca3d486-f9f8-11e8-8f75-0242ac15000c', 'dca13c75-f9f8-11e8-8f75-0242ac15000c', false, to_timestamp(0),
        to_timestamp(0), '0.0.0.0', 0, to_timestamp(0));


INSERT INTO ecu_software (id, name, description)
VALUES ('95989ee7-c3be-11e8-af4b-0242ac120011', 'Firmware', 'OEM''s Firmware for ECU');
INSERT INTO ecu_software (id, name, description)
VALUES ('9912e1ac-5a90-42b2-b2fc-d09825fce7eb', 'SecureGO', 'In-Vehicle network protection');
INSERT INTO ecu_software (id, name, description)
VALUES ('42f23db7-608d-44a8-aad4-32191e7f73d2', 'SecureIXS', 'Intrusion Detection & Protection Firewall');
INSERT INTO ecu_software (id, name, description)
VALUES ('7198e87d-e7cd-4091-bd16-92e0897f271e', 'IXS Rule', 'Cloud-based Rules for SecureIXS');
INSERT INTO ecu_software (id, name, description)
VALUES ('5b3aea21-139f-48a8-9d89-e58b4b936ab2', 'SecureOTA', 'Secured Updates Over The Air');
INSERT INTO ecu_software (id, name, description)
VALUES ('4db62a48-1f75-4f4f-b85a-c282aea7ece1', 'SecureSKYE', 'Security & Data Management Platform');


INSERT INTO obd2device (id, family, kernel, mac_address, client_id, vehicle_id)
VALUES ('e3e3c258-f9f8-11e8-8a56-0242ac15000d', 'iWave-Cloud', '1.0', 'E0-D5-5E-0D-CB-88',
        'obd2device-e3d6f117-f9f8-11e8-8a56-0242ac15000d', 'dba7e828-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO obd2device (id, family, kernel, mac_address, client_id, vehicle_id)
VALUES ('e3e98eba-f9f8-11e8-8a56-0242ac15000d', 'iWave-Embedded', '1.0', 'E0-D5-5E-0D-CB-11',
        'obd2device-e3e94099-f9f8-11e8-8a56-0242ac15000d', 'dca13c75-f9f8-11e8-8f75-0242ac15000c');


INSERT INTO security_software (id, name, description)
VALUES ('95e190f3-db29-11e8-bc6d-0242ac16000a', 'SecureSKYE', 'Security & Data Management Platform');
INSERT INTO security_software (id, name, description)
VALUES ('95e1b804-db29-11e8-bc6d-0242ac16000a', 'SecureGo', 'In-Vehicle network protection');
INSERT INTO security_software (id, name, description)
VALUES ('95e1b805-db29-11e8-bc6d-0242ac16000a', 'SecureIXS', 'Intrusion Detection & Protection Firewall');
INSERT INTO security_software (id, name, description)
VALUES ('95e1b806-db29-11e8-bc6d-0242ac16000a', 'SecureOTA', 'Secured Updates Over The Air');


INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('da831812-f9f8-11e8-8f75-0242ac15000c', 'MKE', 'description', '95e190f3-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('daba7bc3-f9f8-11e8-8f75-0242ac15000c', 'ENCRYPT', 'description', '95e190f3-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dabdfe34-f9f8-11e8-8f75-0242ac15000c', 'AUTH', 'description', '95e190f3-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dac418b5-f9f8-11e8-8f75-0242ac15000c', 'DKLP', 'description', '95e190f3-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dac725f6-f9f8-11e8-8f75-0242ac15000c', 'MKE', 'description', '95e1b804-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dac8fab7-f9f8-11e8-8f75-0242ac15000c', 'ENCRYPT', 'description', '95e1b804-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dace78f8-f9f8-11e8-8f75-0242ac15000c', 'AUTH', 'description', '95e1b804-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dad1d459-f9f8-11e8-8f75-0242ac15000c', 'DKLP', 'description', '95e1b804-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dad556ca-f9f8-11e8-8f75-0242ac15000c', 'MKE', 'description', '95e1b805-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dafa6afb-f9f8-11e8-8f75-0242ac15000c', 'ENCRYPT', 'description', '95e1b805-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('dafe629c-f9f8-11e8-8f75-0242ac15000c', 'AUTH', 'description', '95e1b805-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('db00104d-f9f8-11e8-8f75-0242ac15000c', 'DKLP', 'description', '95e1b805-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('db02cf6e-f9f8-11e8-8f75-0242ac15000c', 'MKE', 'description', '95e1b806-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('db06c70f-f9f8-11e8-8f75-0242ac15000c', 'ENCRYPT', 'description', '95e1b806-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('db0a97a0-f9f8-11e8-8f75-0242ac15000c', 'AUTH', 'description', '95e1b806-db29-11e8-bc6d-0242ac16000a');
INSERT INTO security_setting (id, name, description, security_software_id)
VALUES ('db0d56c1-f9f8-11e8-8f75-0242ac15000c', 'DKLP', 'description', '95e1b806-db29-11e8-bc6d-0242ac16000a');


INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dbca8b5b-f9f8-11e8-8f75-0242ac15000c', false, 'dba7e828-f9f8-11e8-8f75-0242ac15000c',
        '95e190f3-db29-11e8-bc6d-0242ac16000a');
INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dbea4860-f9f8-11e8-8f75-0242ac15000c', false, 'dba7e828-f9f8-11e8-8f75-0242ac15000c',
        '95e1b804-db29-11e8-bc6d-0242ac16000a');
INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dbf2d3e5-f9f8-11e8-8f75-0242ac15000c', false, 'dba7e828-f9f8-11e8-8f75-0242ac15000c',
        '95e1b805-db29-11e8-bc6d-0242ac16000a');
INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dc06f82a-f9f8-11e8-8f75-0242ac15000c', false, 'dba7e828-f9f8-11e8-8f75-0242ac15000c',
        '95e1b806-db29-11e8-bc6d-0242ac16000a');
INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dca8b688-f9f8-11e8-8f75-0242ac15000c', false, 'dca13c75-f9f8-11e8-8f75-0242ac15000c',
        '95e190f3-db29-11e8-bc6d-0242ac16000a');
INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dcb2c8ad-f9f8-11e8-8f75-0242ac15000c', false, 'dca13c75-f9f8-11e8-8f75-0242ac15000c',
        '95e1b804-db29-11e8-bc6d-0242ac16000a');
INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dcb97f72-f9f8-11e8-8f75-0242ac15000c', false, 'dca13c75-f9f8-11e8-8f75-0242ac15000c',
        '95e1b805-db29-11e8-bc6d-0242ac16000a');
INSERT INTO vehicle_security_config (id, is_active, vehicle_id, security_software_id)
VALUES ('dcc08457-f9f8-11e8-8f75-0242ac15000c', false, 'dca13c75-f9f8-11e8-8f75-0242ac15000c',
        '95e1b806-db29-11e8-bc6d-0242ac16000a');


INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbe650bc-f9f8-11e8-8f75-0242ac15000c', false, 'dbca8b5b-f9f8-11e8-8f75-0242ac15000c',
        'da831812-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbe69edd-f9f8-11e8-8f75-0242ac15000c', false, 'dbca8b5b-f9f8-11e8-8f75-0242ac15000c',
        'daba7bc3-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbe6c5ee-f9f8-11e8-8f75-0242ac15000c', false, 'dbca8b5b-f9f8-11e8-8f75-0242ac15000c',
        'dabdfe34-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbe73b1f-f9f8-11e8-8f75-0242ac15000c', false, 'dbca8b5b-f9f8-11e8-8f75-0242ac15000c',
        'dac418b5-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbee6711-f9f8-11e8-8f75-0242ac15000c', false, 'dbea4860-f9f8-11e8-8f75-0242ac15000c',
        'dac725f6-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbee8e22-f9f8-11e8-8f75-0242ac15000c', false, 'dbea4860-f9f8-11e8-8f75-0242ac15000c',
        'dac8fab7-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbeedc43-f9f8-11e8-8f75-0242ac15000c', false, 'dbea4860-f9f8-11e8-8f75-0242ac15000c',
        'dace78f8-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbef2a64-f9f8-11e8-8f75-0242ac15000c', false, 'dbea4860-f9f8-11e8-8f75-0242ac15000c',
        'dad1d459-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbfbad86-f9f8-11e8-8f75-0242ac15000c', false, 'dbf2d3e5-f9f8-11e8-8f75-0242ac15000c',
        'dad556ca-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbfc97e7-f9f8-11e8-8f75-0242ac15000c', false, 'dbf2d3e5-f9f8-11e8-8f75-0242ac15000c',
        'dafa6afb-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbfdd068-f9f8-11e8-8f75-0242ac15000c', false, 'dbf2d3e5-f9f8-11e8-8f75-0242ac15000c',
        'dafe629c-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dbffa529-f9f8-11e8-8f75-0242ac15000c', false, 'dbf2d3e5-f9f8-11e8-8f75-0242ac15000c',
        'db00104d-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dc0e4b2b-f9f8-11e8-8f75-0242ac15000c', false, 'dc06f82a-f9f8-11e8-8f75-0242ac15000c',
        'db02cf6e-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dc0ee76c-f9f8-11e8-8f75-0242ac15000c', false, 'dc06f82a-f9f8-11e8-8f75-0242ac15000c',
        'db06c70f-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dc0f5c9d-f9f8-11e8-8f75-0242ac15000c', false, 'dc06f82a-f9f8-11e8-8f75-0242ac15000c',
        'db0a97a0-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dc11586e-f9f8-11e8-8f75-0242ac15000c', false, 'dc06f82a-f9f8-11e8-8f75-0242ac15000c',
        'db0d56c1-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcacae29-f9f8-11e8-8f75-0242ac15000c', false, 'dca8b688-f9f8-11e8-8f75-0242ac15000c',
        'da831812-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcacfc4a-f9f8-11e8-8f75-0242ac15000c', false, 'dca8b688-f9f8-11e8-8f75-0242ac15000c',
        'daba7bc3-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcad235b-f9f8-11e8-8f75-0242ac15000c', false, 'dca8b688-f9f8-11e8-8f75-0242ac15000c',
        'dabdfe34-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcad235c-f9f8-11e8-8f75-0242ac15000c', false, 'dca8b688-f9f8-11e8-8f75-0242ac15000c',
        'dac418b5-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcb560be-f9f8-11e8-8f75-0242ac15000c', false, 'dcb2c8ad-f9f8-11e8-8f75-0242ac15000c',
        'dac725f6-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcb5aedf-f9f8-11e8-8f75-0242ac15000c', false, 'dcb2c8ad-f9f8-11e8-8f75-0242ac15000c',
        'dac8fab7-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcb5d5f0-f9f8-11e8-8f75-0242ac15000c', false, 'dcb2c8ad-f9f8-11e8-8f75-0242ac15000c',
        'dace78f8-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcb5d5f1-f9f8-11e8-8f75-0242ac15000c', false, 'dcb2c8ad-f9f8-11e8-8f75-0242ac15000c',
        'dad1d459-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcbc1783-f9f8-11e8-8f75-0242ac15000c', false, 'dcb97f72-f9f8-11e8-8f75-0242ac15000c',
        'dad556ca-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcbc65a4-f9f8-11e8-8f75-0242ac15000c', false, 'dcb97f72-f9f8-11e8-8f75-0242ac15000c',
        'dafa6afb-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcbe1355-f9f8-11e8-8f75-0242ac15000c', false, 'dcb97f72-f9f8-11e8-8f75-0242ac15000c',
        'dafe629c-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcbe3a66-f9f8-11e8-8f75-0242ac15000c', false, 'dcb97f72-f9f8-11e8-8f75-0242ac15000c',
        'db00104d-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcc4f128-f9f8-11e8-8f75-0242ac15000c', false, 'dcc08457-f9f8-11e8-8f75-0242ac15000c',
        'db02cf6e-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcc51839-f9f8-11e8-8f75-0242ac15000c', false, 'dcc08457-f9f8-11e8-8f75-0242ac15000c',
        'db06c70f-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcc53f4a-f9f8-11e8-8f75-0242ac15000c', false, 'dcc08457-f9f8-11e8-8f75-0242ac15000c',
        'db0a97a0-f9f8-11e8-8f75-0242ac15000c');
INSERT INTO security_setting_config (id, is_active, vehicle_security_config_id, security_setting_id)
VALUES ('dcc58d6b-f9f8-11e8-8f75-0242ac15000c', false, 'dcc08457-f9f8-11e8-8f75-0242ac15000c',
        'db0d56c1-f9f8-11e8-8f75-0242ac15000c');


INSERT INTO notification_channel (id, type, name, description)
VALUES ('624ce046-0605-4e6b-a13b-9d6cf665503a', 0, 'DefaultNoticationChannel', 'Default channel');
INSERT INTO notification_channel (id, type, name, description)
VALUES ('f2031acb-eca1-4549-b1ac-98b5a7d0806c', 1, 'EmailChannel', 'Notification via email channel');


INSERT INTO notification_topic (id, name, description, subject_prefix)
VALUES ('0dc0fa48-f5e2-11e7-8c3f-9a214cf093ae', 'DataExport',
        'Notification of data export service completed with download link.', 'IEService');


INSERT INTO notification_subscription (user_id, topic_id, channel_id)
VALUES ('0dc0fa48-f5e2-11e7-8c3f-9a214cf093ae', '0dc0fa48-f5e2-11e7-8c3f-9a214cf093ae',
        'f2031acb-eca1-4549-b1ac-98b5a7d0806c');
