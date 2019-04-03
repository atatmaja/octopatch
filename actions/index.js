import * as accountActions from './account'
import * as patientActions from './patient'
import * as notificationActions from './notifications'

//below support for combining multiple actions together is defined
//actions will be called to calculate how state should be changed within the app
//they will then call reducers, which will actually handle those changes

export const ActionCreators = Object.assign({}, 
    accountActions,
    patientActions,
    notificationActions
)