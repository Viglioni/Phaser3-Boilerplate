import Phaser from 'phaser'
import {not, and, pathOr} from 'ramda'


const globalStatesExists = () => Boolean(Phaser.globalStates)

const stateNotExists = (stateName) => not( Boolean(Phaser.globalStates[stateName]))

const createState = (stateName, initialValue) => {
    Phaser.globalStates[stateName] = {
        value: initialValue,
        lock: false
    }
}

const changeLock = (stateName, value) => new Promise((resolve, reject) => {
     resolve(Phaser.globalStates[stateName].lock = value)
})

const lockState = stateName => changeLock(stateName, true)
const unlockState = stateName => changeLock(stateName, false)
const changeValue = (stateName, newValue) =>  new Promise((resolve, reject) => {
    resolve( Phaser.globalStates[stateName].value = newValue )    
})

const getFullState = (stateName) => Phaser.globalStates[stateName]

const changeState = stateName => async ( newValue) => {
    const {lock} =  getFullState(stateName)
    if(lock) window.setTimeout(()=> changeState(stateName, newValue), 300)
    else {
        await lockState(stateName)
        await changeValue(stateName, newValue)
        await unlockState(stateName)
    }
}



export const createStateManager = () => {
    if(globalStatesExists())  throw "Global states already exists"
    else  Phaser.globalStates = {}
}


export const useState = (stateName, initialValue=null) => {
    if( not(globalStatesExists())) throw "Global states do not exists!"
    else{
        if(stateNotExists(stateName)) createState(stateName, initialValue)
        const state = Phaser.globalStates[stateName]
        return [
            state,
            changeState(stateName)
        ]
    }}