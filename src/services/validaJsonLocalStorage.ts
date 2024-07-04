


const validaJson = (value: any) => {
    let type: string = typeof value
    if (type === "array" || type === "object")
        return JSON.stringify(value)

    console.log(value)
    return value
}

const convertJson = (value: string | null) => {
    if (typeof value === 'string')
        return JSON.parse(value)

    return ''
}


export {
    validaJson,
    convertJson
}