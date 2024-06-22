export const regexDocumento = new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})");
export const regexEMAIL = new RegExp("^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$");
export const maskPhone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export const fixPhone = /\((\d{2})\) (\d{5})-(\d{4})/;

export const getTypeFromFileName = (fileName: string): string => {
    return fileName.split('.')[1];
}