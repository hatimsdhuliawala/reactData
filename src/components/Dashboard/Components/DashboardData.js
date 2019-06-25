const HeaderData = [
  {
    id: 1,
    display: 'Validate File Name',
    event: 'validateFileName',
    xs: 12,
    sm: 3,
    tooltip: 'pipeline-intake-app produce this events.',
  },
  {
    id: 2,
    display: 'Quality Check',
    event: 'imageQualityCheck',
    xs: 12,
    sm: 3,
    tooltip: 'pipeline-upload-app produce this events.',
  },
  {
    id: 3,
    display: 'Image Publish',
    event: 'publish',
    xs: 12,
    sm: 3,
    tooltip: 'pipeline-upload-app produce this events.',
  },
  {
    id: 4,
    display: 'Validate Publish',
    event: 'validatePublish',
    xs: 12,
    sm: 3,
    tooltip: 'pipeline-notify-app produce this events.',
  },
  {
    id: 5,
    display: 'Notify',
    event: 'notify',
    xs: 12,
    sm: 3,
    tooltip: 'pipeline-notify-app produce this events.',
  },
  {
    id: 7,
    display: 'Purge',
    event: 'purge',
    xs: 12,
    sm: 3,
    tooltip: '',
  },
  {
    id: 8,
    display: 'Generate Label',
    event: 'generateLabel',
    xs: 12,
    sm: 3,
    tooltip: '',
  },
  {
    id: 9,
    display: 'Generate Swatch',
    event: 'generateSwatch',
    xs: 12,
    sm: 3,
    tooltip: '',
  },
]

const initialState = {
  isFetching: false,
  event: undefined,
  status: undefined,
  displayMessage: undefined,
  isMessageShown: false,
  jobData: [],
}

const TabData = [
  {
    id: 0,
    display: 'Dashboards',
  },
  {
    id: 1,
    display: 'System Health',
  },
  {
    id: 2,
    display: 'Monitor',
  },
  {
    id: 3,
    display: 'Item Debugger',
  },
  {
    id: 4,
    display: 'Sync Items',
  },
  {
    id: 5,
    display: 'Bulk Upload Jobs',
  },
]

const Events = [
  {
    id: 1,
    event: 'validateFileName',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 2,
    event: 'validateFileName',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 3,
    event: 'validateFileName',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 4,
    event: 'validateFileName',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 5,
    event: 'validateFileName',
    status: 'InProcess',
    isFetching: false,
  },
  {
    id: 6,
    event: 'imageQualityCheck',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 7,
    event: 'imageQualityCheck',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 8,
    event: 'imageQualityCheck',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 9,
    event: 'imageQualityCheck',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 10,
    event: 'imageQualityCheck',
    status: 'InProcess',
    isFetching: false,
  },
  {
    id: 11,
    event: 'publish',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 12,
    event: 'publish',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 13,
    event: 'publish',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 14,
    event: 'publish',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 15,
    event: 'publish',
    status: 'InProcess',
    isFetching: false,
  },
  {
    id: 16,
    event: 'validatePublish',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 17,
    event: 'validatePublish',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 18,
    event: 'validatePublish',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 19,
    event: 'validatePublish',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 20,
    event: 'validatePublish',
    status: 'InProcess',
    isFetching: false,
  },
  {
    id: 21,
    event: 'notify',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 22,
    event: 'notify',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 23,
    event: 'notify',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 24,
    event: 'notify',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 25,
    event: 'notify',
    status: 'InProcess',
    isFetching: false,
  },
  {
    id: 26,
    event: 'purge',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 27,
    event: 'purge',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 28,
    event: 'purge',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 29,
    event: 'purge',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 30,
    event: 'purge',
    status: 'InProcess',
    isFetching: false,
  },
  {
    id: 31,
    event: 'generateLabel',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 32,
    event: 'generateLabel',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 33,
    event: 'generateLabel',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 34,
    event: 'generateLabel',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 35,
    event: 'generateLabel',
    status: 'InProcess',
    isFetching: false,
  },
  {
    id: 36,
    event: 'generateSwatch',
    status: 'Complete',
    isFetching: false,
  },
  {
    id: 37,
    event: 'generateSwatch',
    status: 'Retry',
    isFetching: false,
  },
  {
    id: 38,
    event: 'generateSwatch',
    status: 'Error',
    isFetching: false,
  },
  {
    id: 39,
    event: 'generateSwatch',
    status: 'Critical',
    isFetching: false,
  },
  {
    id: 40,
    event: 'generateSwatch',
    status: 'InProcess',
    isFetching: false,
  },
]
const ActuatorData = [
  {
    id: 1,
    display: 'Pipeline Intake APP(DEVELOPMENT, 10.60.151.227)',
    url: 'http://10.60.151.227:8080/actuator/loggers/com.tgt.cep',
  },
  {
    id: 2,
    display: 'Pipeline Intake APP(DEVELOPMENT, 10.60.151.227)',
    url: 'http://10.61.141.130:8080/actuator/loggers/com.tgt.cep',
  },
  {
    id: 3,
    display: 'Pipeline Intake APP(STAGING, 10.60.151.214)',
    url: 'http://10.60.151.214:8080/actuator/loggers/com.tgt.cep',
  },
  {
    id: 4,
    display: 'Pipeline Intake APP(STAGING, 10.61.141.135)',
    url: 'http://10.61.141.135:8080/actuator/loggers/com.tgt.cep',
  }, {
    id: 5,
    display: 'Pipeline Intake APP(PRODUCTION, 10.60.151.246)',
    url: 'http://10.60.151.246:8080/actuator/loggers/com.tgt.cep',
  },
  {
    id: 6,
    display: 'Pipeline Intake APP(PRODUCTION, 10.61.141.141)',
    url: 'http://10.61.141.141:8080/actuator/loggers/com.tgt.cep',
  },
]

const LogLevels = [
  {
    id: 1,
    display: 'INFO',
    value: 'INFO',
  },
  {
    id: 2,
    display: 'DEBUG',
    url: 'DEBUG',
  },
  {
    id: 3,
    display: 'ERROR',
    url: 'ERROR',
  },
  {
    id: 4,
    display: 'WARN',
    url: 'WARN',
  },
]

export { HeaderData, initialState, TabData, ActuatorData, LogLevels, Events }
