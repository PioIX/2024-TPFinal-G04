
export function perderVida(){
    var a =localStorage.getItem("lives")-1
    localStorage.setItem("lives",a)

}

let timeoutPerderVida;

export function perderComponente(setLuzComponente){
    
    return new Promise((resolve, reject) => {
        setLuzComponente("/luzcomponente/apagado.png")
        clearTimeout(timeoutPerderVida);
        timeoutPerderVida = setTimeout(function () {
            let vida= localStorage.getItem("lives")-1
            localStorage.setItem("lives", vida)
            setLuzComponente("/luzcomponente/luz_roja.png")
            setTimeout(function () {
                setLuzComponente("/luzcomponente/apagado.png")
                resolve('luz')
            }, 1000);
        }, 200);
    })}
    
let timeoutGanarComp;
export function ganarComponente(setLuzComponente){
    return new Promise((resolve, reject) => {
        clearTimeout(timeoutGanarComp);
        timeoutGanarComp = setTimeout(function () {
            let comp= parseInt(localStorage.getItem("componentesMios"))+1
            localStorage.setItem("componentesMios", comp)
            resolve('luz')
        }, 200);
        setLuzComponente("/luzcomponente/luz_verde.png")
    })
}