# Historial de Prompts 📑

## Modelo 🤖

- **LLM:** Claude Sonnet 4
- **Versión:** 2024

## Categorías 🏷️

> Lista de categorías de prompts

## Estadísticas 📊

> Tabla con estadísticas de prompts

### Prompts por Categoría

> Lista de prompts por categoría

### Roles Utilizados

> Lista de roles utilizados en el proceso

## Prompts de usuario 📝👤

> Prompts de usuario con categorías asignadas

### **Prompt 1:** 
Eres un líder técnico experto en implementación de sistemas ATS.

Se requiere modificar el @frontend/ para agregar una interfaz que complete la funcionalidad de posiciones. Revisa todo el detalle de la solicitud en @init.md si necesitas mas contexto sobre el proyecto y lo que ya esta implementado revisa @README.md del frontend y @README.md general del proyecto.

Revisa el @backend/ si necesitas obtener mas informacion de lo que esta desarrollado. Nada del backend se puede modificar. en caso de depender el datos del backend o BD, genera data dummy para visualizarla en el despliegue.

Genera los lineamientos tecnicos necesarios para que un desarrollador frontend lleve a cabo ,con exito, el trabajo solicitado, documenta todo en @frontend-development.md usa buenas practicas de desarrollo y respeta el estilo y diseño que ya tiene el frontend.

Por ultimo registra este prompt en @prompts-AMP.md siguiendo el formato que se indica .

### **Prompt 2:** 
mejora y detalla los criterios de aceptacion en @frontend-development.md 

### **Prompt 3:** 
Eres un desarrollador fullstack senior.

Necesitas crear una interfaz en un sistema ya existente. Revisa @frontend-development.md para el desarrollo, si lo necesitas puedes revisar el contexto en @README.md del frontend y @README.md general del proyecto. tambien si necesitas revisa @init.md q contiene la informacion oficial de la solicitud

### **Prompt 4:** 
checkea por que la nueva interfaz no muestra nada

por consola arroja: No routes matched location "/positions/1" 

---
> Aquí comencé de nuevo.
---

### **Prompt 5:** 
Eres un desarrollador frontend senior.

anteriormente intenté desarrollar una interfaz, pero no tuve exito. Sin embargo documenté todo el proceso y todos los errores.

para el desarrollo especifico revisa @init.md @frontend-development.md 

para revisar los errores y problemas que tuve revisa la demas info dentro de @docs/ 

el contexto del proyecto y del front en particular lo puedes revisar en los @README.md @README.md 

### **Prompt 6:** 
no debias modificar lo ya existente. cambiaste el diseño y estilo de la interfaz de posiciones @old-positions.png y al precionar ver proceso arroja error:

onNavigate is not a function
TypeError: onNavigate is not a function
    at onClick (http://localhost:3000/static/js/bundle.js:86668:26)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:49221:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:49265:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:49322:35)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:3000/static/js/bundle.js:49336:29)
    at executeDispatch (http://localhost:3000/static/js/bundle.js:53479:7)
    at processDispatchQueueItemsInOrder (http://localhost:3000/static/js/bundle.js:53505:11)
    at processDispatchQueue (http://localhost:3000/static/js/bundle.js:53516:9)
    at dispatchEventsForPlugins (http://localhost:3000/static/js/bundle.js:53525:7)
    at http://localhost:3000/static/js/bundle.js:53685:16

revisa y arreglalo

## Conslusiones 🏁

> Conclusión general sobre el proceso de desarrollo
