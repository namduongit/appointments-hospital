export const validNumberPhone = (numberPhone: string) => {
    return (!/^[0-9]{10,11}$/.test(numberPhone.replace(/\s/g, "")));
}