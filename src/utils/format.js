export function formatCPF(cpf) {
    cpf = cpf.toString().replace(/[^\d]/g, '').padStart(11, '0');
    const ultimos = cpf.substr(cpf.length - 2);
    const c = cpf.substr(cpf.length - 5, 3);
    const b = cpf.substr(cpf.length - 8, 3);
    const a = cpf.substr(cpf.length - 11, 3);
    return `${a}.${b}.${c}-${ultimos}`;
}

export function formatRG(rg) {
    rg = rg.toString().replace(/[^\d]/g, '').padStart(9, '0');
    const a = rg.substr(0, 3);
    const b = rg.substr(3, 3);
    const c = rg.substr(6);
    return `${a}.${b}.${c}`;
}

export function formatShortName(fullName) {
    const split = fullName.toString().trim().split(/\s+/);
    if (split.length >= 2) {
        const firstTwo = `${split[0]} ${split[1]}`;
        const disallow = ['de', 'da', 'das', 'dos'];
        if (firstTwo.length < 20 && !disallow.includes(split[1].toLowerCase()))
            return firstTwo;
    }
    return split[0];
}