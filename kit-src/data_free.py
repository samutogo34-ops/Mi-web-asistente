# Kit gratis — 20 plantillas (tono cálido, máx. 3 emojis) y versiones para padres o acudientes.
# Cada plantilla: (titulo, cuando, mensaje, consejo_o_None)

SECTIONS = [('Primer contacto',
  'La primera respuesta decide si el paciente agenda contigo o sigue buscando.',
  [('Respuesta a un primer mensaje',
    'Cuando alguien escribe por primera vez pidiendo información.',
    'Hola, [Nombre] 🤍 Gracias por escribirme. Sé que dar este primer paso no siempre es fácil, y me alegra que lo haya hecho.\n'
    'Soy [Tu nombre], psicólogo/a. Atiendo de forma [presencial / virtual] y la primera sesión es un espacio para conocernos con calma.\n'
    '¿Le queda mejor en la mañana o en la tarde? Así le propongo un par de horarios 🌿',
    None),
   ('Fuera de horario',
    'Respuesta automática para mensajes de noche o fines de semana.',
    'Hola 🤍 Gracias por escribir. En este momento estoy fuera de mi horario de atención ([horario]), pero leí su mensaje y le respondo '
    'personalmente apenas vuelva.\n'
    'Si se trata de una urgencia, por favor comuníquese con la línea 123 o acuda al servicio de urgencias más cercano.',
    'Incluir el aviso de urgencias es una buena práctica profesional.'),
   ('Tarifas y modalidad',
    'Cuando preguntan cuánto cuesta y cómo funcionan las sesiones.',
    '¡Con mucho gusto le cuento! 😊\n'
    '• Duración: [50] minutos\n'
    '• Valor: [$000.000] por sesión\n'
    '• Modalidad: [presencial en [dirección] / virtual por videollamada]\n'
    '• Pago: [transferencia / Nequi / Daviplata / tarjeta]\n'
    '¿Le gustaría que le proponga algunos horarios para la primera sesión?',
    None)]),
 ('Agendar y confirmar',
  'Mensajes claros que evitan malentendidos con la fecha, la hora y el lugar.',
  [('Propuesta de horarios',
    'Ofrece opciones concretas: es más fácil decir sí a una opción.',
    '¡Claro que sí! Tengo disponibles estos espacios 📅\n'
    '• [día] a las [hora]\n'
    '• [día] a las [hora]\n'
    '• [día] a las [hora]\n'
    '¿Cuál le queda mejor? Apenas me diga, se lo dejo reservado ✨',
    None),
   ('Confirmación de cita presencial',
    'Justo después de que el paciente elija horario.',
    '¡Perfecto, [Nombre]! Su sesión quedó reservada 🤍\n'
    '📅 [día] a las [hora]\n'
    '📍 [dirección]\n'
    'Un día antes le escribo para recordárselo. Y si le surge algo, solo avíseme con [24] horas de anticipación y lo movemos sin problema.',
    None),
   ('Confirmación de cita virtual',
    'Para sesiones por videollamada.',
    '¡Listo, [Nombre]! Su sesión virtual quedó reservada 🤍\n'
    '📅 [día] a las [hora]\n'
    '💻 Enlace: [enlace]\n'
    'Le recomiendo conectarse desde un lugar tranquilo donde se sienta cómodo/a. Un día antes le recuerdo la cita.',
    None)]),
 ('Recordatorios',
  'La forma más sencilla de reducir las ausencias sin aviso.',
  [('Recordatorio 24 horas antes',
    'El más importante: pide confirmación activa.',
    'Hola, [Nombre] 🌿 Le escribo para recordarle nuestra sesión de mañana, [día], a las [hora].\n'
    '¿Me confirma su asistencia respondiendo "Sí"? Y si necesita cambiarla, cuénteme con confianza y buscamos otro horario 🤍',
    'Pedir una respuesta compromete más que un simple aviso.'),
   ('Recordatorio 2 horas antes', 'Un aviso corto el mismo día.', '¡Hola, [Nombre]! Nos vemos hoy a las [hora]. Le espero 🤍', None),
   ('Antes de la primera sesión',
    'Reduce los nervios del paciente nuevo.',
    'Hola, [Nombre] 🌿 Mañana es nuestra primera sesión, a las [hora].\n'
    'Quiero que sepa que no necesita preparar nada: hablaremos de lo que le trae a consulta a su ritmo y resolveré todas sus dudas sobre '
    'el proceso.\n'
    '¿Hay algo que quiera preguntarme antes? 🤍',
    None),
   ('Recordatorio de sesión virtual',
    'Unos minutos antes, con el enlace a mano.',
    'Hola, [Nombre] 😊 En [15] minutos empezamos. Aquí tiene el enlace: [enlace]\nLe espero 🤍',
    None)]),
 ('Cambios y cancelaciones',
  'Firme con tu política, cercano con la persona.',
  [('El paciente quiere reprogramar',
    'Cuando avisa con tiempo.',
    'Gracias por avisarme con tiempo, [Nombre], de verdad se lo agradezco 🤍\n'
    '¿Le sirve el [día] a las [hora] o prefiere el [día] a las [hora]?',
    None),
   ('Cancelación tardía',
    'Cuando cancela con menos anticipación de la que indica tu política.',
    'Entiendo, [Nombre], y gracias por avisarme. Como le comenté al agendar, las cancelaciones con menos de [24] horas de anticipación [se '
    'cobran / cuentan como sesión realizada].\n'
    'Para no perder la continuidad, ¿le parece si dejamos ya agendado un nuevo espacio? 🤍',
    'Tener la política por escrito desde la primera cita evita conversaciones incómodas.'),
   ('Ausencia sin aviso',
    'Cuando el paciente no se presenta.',
    'Hola, [Nombre] 🤍 Hoy le esperaba a las [hora] y no pudimos vernos. Solo quería saber si está todo bien.\n'
    'Cuando lo desee, me escribe y buscamos un nuevo horario.',
    None),
   ('Necesitas cambiar tú la cita',
    'Cuando el cambio viene de tu parte.',
    'Hola, [Nombre]. Le escribo porque me surgió un imprevisto y no podré atenderle el [día] a las [hora]. Lamento mucho el cambio 🙏\n'
    '¿Le quedaría bien el [día] a las [hora] o el [día] a las [hora]?',
    None)]),
 ('Pagos y facturas',
  'Hablar de dinero sin incomodidad.',
  [('Datos de pago',
    'Al confirmar la cita o después de la sesión.',
    'Le comparto los datos para el pago de la sesión ([$000.000]) 😊\n'
    '• Nequi / Daviplata: [número]\n'
    '• Transferencia: [banco, tipo y número de cuenta, titular]\n'
    'Cuando lo realice, ¿me podría enviar el comprobante? ¡Mil gracias! 🤍',
    None),
   ('Recordatorio amable de pago',
    'Cuando un pago lleva unos días pendiente.',
    'Hola, [Nombre] 🌿 Le escribo solo para recordarle que está pendiente el pago de la sesión del [día] ([$000.000]). Seguro se le pasó '
    'entre tantas cosas, ¡nos pasa a todos!\n'
    'Le dejo de nuevo los datos: [datos de pago].',
    None),
   ('Envío de factura o cuenta de cobro',
    'Si el paciente necesita el soporte, por ejemplo para su póliza o prepagada.',
    'Hola, [Nombre] 😊 Le adjunto la [factura / cuenta de cobro] de la sesión del [día].\n'
    '¿Necesita que incluya algún dato adicional? Con gusto se la envío de nuevo.',
    'Revisa con tu contador si debes emitir factura electrónica según tu régimen.')]),
 ('Seguimiento',
  'Pequeños gestos que cuidan la relación profesional.',
  [('Después de la primera sesión',
    'El mismo día o al día siguiente.',
    'Hola, [Nombre] 🤍 Gracias por la sesión de hoy y por la confianza.\n'
    '¿Le reservo nuestro próximo encuentro el [día] a las [hora]? Cualquier duda sobre horarios o pagos, puede escribirme por aquí.',
    None),
   ('Paciente que no ha vuelto a agendar',
    'Un único mensaje respetuoso, sin insistir.',
    'Hola, [Nombre] 🌿 Hace un tiempo que no coincidimos y quería saludarle. Si en algún momento desea retomar las sesiones, tengo horarios '
    'disponibles.\n'
    'Sin ningún compromiso: aquí estaré cuando lo necesite 🤍',
    'Envíalo una sola vez y respeta siempre la decisión del paciente.'),
   ('Al finalizar el proceso',
    'Cuando se cierra la etapa de terapia.',
    '[Nombre], fue un verdadero gusto acompañarle en este proceso 🤍 Si en el futuro desea volver a conversar, ya sabe dónde encontrarme.\n'
    '¡Le deseo lo mejor en esta nueva etapa! 🌿',
    None)])]

FAM = {'Respuesta a un primer mensaje': 'Hola, [Nombre del acudiente] 🤍 Gracias por escribirme y por buscar apoyo para [Nombre del menor]. Sé '
                                  'que como mamá/papá uno quiere hacer lo mejor, y este es un gran paso.\n'
                                  'Soy [Tu nombre], psicólogo/a. La primera sesión es un espacio para conocernos y entender qué está '
                                  'viviendo [Nombre del menor].\n'
                                  '¿Le queda mejor en la mañana o en la tarde, teniendo en cuenta su horario del colegio? 🌿',
 'Propuesta de horarios': '¡Claro que sí! Estos espacios podrían funcionarle a [Nombre del menor] 📅\n'
                          '• [día] a las [hora]\n'
                          '• [día] a las [hora]\n'
                          '¿Cuál se acomoda mejor con el colegio y sus actividades? Apenas me diga, se lo dejo reservado ✨',
 'Confirmación de cita presencial': '¡Perfecto, [Nombre del acudiente]! La sesión de [Nombre del menor] quedó reservada 🤍\n'
                                    '📅 [día] a las [hora]\n'
                                    '📍 [dirección]\n'
                                    'Un día antes le escribo para recordárselo. Si les surge algo, solo avíseme con [24] horas de '
                                    'anticipación.',
 'Confirmación de cita virtual': '¡Listo, [Nombre del acudiente]! La sesión virtual de [Nombre del menor] quedó reservada 🤍\n'
                                 '📅 [día] a las [hora]\n'
                                 '💻 Enlace: [enlace]\n'
                                 'Les recomiendo que [Nombre del menor] se conecte desde un lugar tranquilo y con privacidad, donde se '
                                 'sienta cómodo/a.',
 'Recordatorio 24 horas antes': 'Hola, [Nombre del acudiente] 🌿 Le recuerdo la sesión de [Nombre del menor] mañana, [día], a las [hora].\n'
                                '¿Me confirma la asistencia respondiendo "Sí"? Si necesitan cambiarla, cuénteme con confianza y buscamos '
                                'otro horario 🤍',
 'Recordatorio 2 horas antes': '¡Hola, [Nombre del acudiente]! Hoy a las [hora] espero a [Nombre del menor] 🤍',
 'Antes de la primera sesión': 'Hola, [Nombre del acudiente] 🌿 Mañana es la primera sesión de [Nombre del menor], a las [hora].\n'
                               'Una sugerencia: cuéntele con palabras sencillas que va a hablar con alguien que le va a escuchar, sin '
                               'presiones. No necesita preparar nada.\n'
                               '¿Hay algo que le gustaría contarme antes de la cita? 🤍',
 'Recordatorio de sesión virtual': 'Hola, [Nombre del acudiente] 😊 En [15] minutos empieza la sesión de [Nombre del menor]. Aquí tiene el '
                                   'enlace: [enlace]\n'
                                   '¡Le espero! 🤍',
 'El paciente quiere reprogramar': 'Gracias por avisarme con tiempo, [Nombre del acudiente], de verdad se lo agradezco 🤍\n'
                                   '¿A [Nombre del menor] le sirve el [día] a las [hora] o prefieren el [día] a las [hora]?',
 'Cancelación tardía': 'Entiendo, [Nombre del acudiente], y gracias por avisarme. Como le comenté al agendar, las cancelaciones con menos '
                       'de [24] horas de anticipación [se cobran / cuentan como sesión realizada].\n'
                       'Para que [Nombre del menor] no pierda la continuidad, ¿dejamos ya agendado un nuevo espacio? 🤍',
 'Ausencia sin aviso': 'Hola, [Nombre del acudiente] 🤍 Hoy esperaba a [Nombre del menor] a las [hora] y no pudimos vernos. Solo quería '
                       'saber si está todo bien.\n'
                       'Cuando lo deseen, me escriben y buscamos un nuevo horario.',
 'Necesitas cambiar tú la cita': 'Hola, [Nombre del acudiente]. Me surgió un imprevisto y no podré atender a [Nombre del menor] el [día] a '
                                 'las [hora]. Lamento mucho el cambio 🙏\n'
                                 '¿Les quedaría bien el [día] a las [hora] o el [día] a las [hora]?',
 'Datos de pago': 'Le comparto los datos para el pago de la sesión de [Nombre del menor] ([$000.000]) 😊\n'
                  '• Nequi / Daviplata: [número]\n'
                  '• Transferencia: [banco, tipo y número de cuenta, titular]\n'
                  '¿Me podría enviar el comprobante cuando lo realice? ¡Mil gracias! 🤍',
 'Recordatorio amable de pago': 'Hola, [Nombre del acudiente] 🌿 Le recuerdo que está pendiente el pago de la sesión de [Nombre del menor] '
                                'del [día] ([$000.000]). Seguro se le pasó entre tantas cosas, ¡nos pasa a todos!\n'
                                'Le dejo de nuevo los datos: [datos de pago].',
 'Envío de factura o cuenta de cobro': 'Hola, [Nombre del acudiente] 😊 Le adjunto la [factura / cuenta de cobro] de la sesión de [Nombre '
                                       'del menor] del [día].\n'
                                       '¿Necesita que vaya a nombre de alguien en especial o con algún dato adicional?',
 'Después de la primera sesión': 'Hola, [Nombre del acudiente] 🤍 Gracias por traer a [Nombre del menor] hoy y por la confianza.\n'
                                 '¿Le reservo la próxima sesión el [día] a las [hora]? Si quiere, también podemos agendar un espacio solo '
                                 'con ustedes para conversar sobre el proceso.',
 'Paciente que no ha vuelto a agendar': 'Hola, [Nombre del acudiente] 🌿 Hace un tiempo no veo a [Nombre del menor] y quería saludarles. Si '
                                        'en algún momento desean retomar las sesiones, tengo horarios disponibles.\n'
                                        'Sin ningún compromiso: aquí estaré 🤍',
 'Al finalizar el proceso': '[Nombre del acudiente], fue un gusto acompañar a [Nombre del menor] y a ustedes como familia en este proceso '
                            '🤍 Si en el futuro lo necesitan, ya saben dónde encontrarme.\n'
                            '¡Les deseo lo mejor! 🌿'}
