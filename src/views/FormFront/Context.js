import { createContext, useContext, useEffect, useState } from "react";
import ChangeService from "../../services/ChangeService";
import CurrencyService from "../../services/CurrencyService";


const ContextWizard = createContext()

function useWizard(){
    return useContext(ContextWizard)
}

function ProviderWizard({ children }) {
    const [step, setStep] = useState(1)
    const [changes, setChanges] = useState([])
    const [mount, setMount] = useState(0)
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState('')

    useEffect(()=>{
        if(changes.length===0 && !loaded) {
            (async ()=>{
                await loadChanges()
                setLoaded(true)
            })()
        }
    },[changes])

    const loadChanges = async () => {
        setLoading(true)
        const tempChanges = await ChangeService.get()
        setChanges( prev => tempChanges )
        setLoading(false)
    }

    const loadChanges2 = async () => {
        const tempChanges = await ChangeService.get()
        setChanges( prev => tempChanges )
    }

    const next = () => setStep( prev => { 
        return prev>=2 ? 2 : prev + 1
     })

    const back = () => setStep( prev => { 
        return prev<=1 ? 1 : prev - 1
     })

    const isAvalaible = async (currency_from, currency_to, quantity ) => {
        const currencies = await CurrencyService.get()
        const { founds } = currencies.find( currency => currency.name===currency_to )
        console.log( 'founds', founds, founds>quantity )
        setChecked(true)
        return founds>quantity
    }
    
    return <ContextWizard.Provider value={{
        step,
        loading,
        checked,
        isAvalaible,
        mount,
        setMount,
        changes,
        setChanges,
        loadChanges,
        selected,
        setSelected,
        next,
        back
    }}>{children}</ContextWizard.Provider>
}

export { ProviderWizard, useWizard }