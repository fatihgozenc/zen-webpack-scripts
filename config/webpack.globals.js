module.exports = {
    classes: (...classNames) => classNames.filter(c => c).join(" ")
}