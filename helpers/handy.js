export const capitalizeString = (str) =>{
    
    const stringCapitalized = str.split(" ").map(word =>{
        const fLetter = word[0].toUpperCase();
        return fLetter+word.slice(1);
    }).join(" ");

    return stringCapitalized;

}