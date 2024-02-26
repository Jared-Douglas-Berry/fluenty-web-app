import React from 'react';
import { MagnifyingGlass, Rings, DNA } from "react-loader-spinner";

export function MagnifyingGlassSpinnerLoading(){
    return (
        <div>
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>
    )
}

export function RingsSpinnerLoading(){
    return (
        <div>
            <Rings
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default function DNASpinnerLoading({styleBtn}){
    return (
        <div className={styleBtn}>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    )
}