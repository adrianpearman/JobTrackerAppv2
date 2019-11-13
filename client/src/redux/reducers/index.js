import { combineReducers } from 'redux'

import {jobsReducer} from './jobsReducer'
import {userReducer} from './usersReducer'

const jobTrackingReducer = combineReducers({
    jobs: jobsReducer,
    user: userReducer
})

export default jobTrackingReducer