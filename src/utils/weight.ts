
interface WeightAmount {
    weight: number
    unit: "t" | "kg" | "g"
}
export function weightConvert(amount: number): WeightAmount {
    const tonnes = amount / (1000 * 1000)
    if (tonnes >= 1)
        return { weight: tonnes, unit: "t" }


    const kilos = amount / 1000
    if (kilos >= 1)
        return { weight: kilos, unit: "kg" }


    return { weight: amount, unit: "g" }
}