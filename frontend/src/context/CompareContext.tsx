import { PNodes } from "../types"
import { SetStateAction } from 'react';
import { createContext, useContext, useState } from "react"

interface Compare {
	compare: PNodes | undefined
	context: PNodes | undefined
	setContext: React.Dispatch<SetStateAction<PNodes | undefined>>
	setCompare: React.Dispatch<SetStateAction<PNodes | undefined>>
}

const Comparison = createContext< Compare | undefined>( undefined )

export const ComparisonProvider = ({children}: { children: React.ReactNode}) => {
	const [ context ,  setContext ] = useState< PNodes | undefined >(undefined)
	const [ compare ,  setCompare ] = useState< PNodes | undefined >(undefined)

	return (
		<Comparison.Provider value={{ compare , context , setCompare , setContext }}>
			{children}
		</Comparison.Provider>
	)
}

export const useComparison = () => {
	const context = useContext(Comparison)
	if (!context) throw new Error("useComparison must be used within a ComparisonProvider")
	return context
}