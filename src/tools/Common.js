export const handlerChange = (setter) => (event) => {
    setter( prev => event.target.value )
}