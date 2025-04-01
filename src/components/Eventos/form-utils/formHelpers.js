/**
 * Funciones de utilidad para formularios
 */

/**
 * Formatea una fecha en formato ISO (YYYY-MM-DD)
 * @param {string|number} day - Día del mes
 * @param {string|number} month - Mes (1-12)
 * @param {string|number} year - Año
 * @returns {string} Fecha en formato ISO o cadena vacía si falta algún valor
 */
export function formatISODate(day, month, year) {
    if (!day || !month || !year) return ""
  
    const formattedDay = day.toString().padStart(2, "0")
    const formattedMonth = month.toString().padStart(2, "0")
  
    return `${year}-${formattedMonth}-${formattedDay}`
  }
  
  /**
   * Genera un array con números consecutivos
   * @param {number} start - Número inicial
   * @param {number} end - Número final
   * @returns {Array} Array con números consecutivos
   */
  export function generateNumberArray(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }
  
  /**
   * Genera un array de años
   * @param {number} count - Cantidad de años a generar
   * @param {number} startYear - Año inicial (por defecto, el año actual)
   * @param {boolean} descending - Si es true, ordena los años de mayor a menor
   * @returns {Array} Array con los años
   */
  export function generateYears(count, startYear = new Date().getFullYear(), descending = true) {
    const years = Array.from({ length: count }, (_, i) => startYear - i)
    return descending ? years : years.reverse()
  }
  
  /**
   * Valida un formulario básico
   * @param {Object} formData - Datos del formulario
   * @param {Array} requiredFields - Campos requeridos
   * @returns {boolean} True si el formulario es válido
   */
  export function validateBasicForm(formData, requiredFields) {
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false
      }
    }
    return true
  }
  
  /**
   * Valida un correo electrónico
   * @param {string} email - Correo electrónico a validar
   * @returns {boolean} True si el correo es válido
   */
  export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  /**
   * Valida un número de teléfono (formato básico)
   * @param {string} phone - Número de teléfono a validar
   * @returns {boolean} True si el teléfono es válido
   */
  export function validatePhone(phone) {
    return /^\d{7,15}$/.test(phone.replace(/[\s-]/g, ""))
  }
  
  