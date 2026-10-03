// Documentos legales del sitio (Colombia): Ley 1581 de 2012 y Decreto 1377 de 2013
// (compilado en el Decreto 1074 de 2015) para datos personales, y Ley 1480 de 2011
// (Estatuto del Consumidor) para venta, garantías y ventas a distancia.
// Solo se afirman datos reales del negocio; lo que no se conoce se remite a la
// cotización, la orden o la factura en vez de inventar plazos o costos.

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  body: LegalBlock[];
};

export const BUSINESS = {
  name: "Multidiagnósticos AS",
  address: "Cra. 27 #13-05, Sabanalarga, Atlántico, Colombia",
  email: "contacto@multidiagnosticosas.com",
  phones: "(+57) 302 319 1749 y (+57) 300 365 1525",
  whatsapp: "(+57) 300 365 1525",
  hours: "lunes a viernes de 8:00 a. m. a 5:30 p. m. y sábados de 8:30 a. m. a 4:00 p. m.",
  site: "www.multidiagnosticosas.com",
};

const UPDATED = "3 de octubre de 2026";

const RESPONSABLE: LegalBlock = {
  type: "ul",
  items: [
    `Nombre: ${BUSINESS.name}.`,
    `Domicilio y dirección: ${BUSINESS.address}.`,
    `Correo electrónico: ${BUSINESS.email}.`,
    `Teléfonos: ${BUSINESS.phones}.`,
    `Sitio web: ${BUSINESS.site}.`,
  ],
};

const DERECHOS: LegalBlock = {
  type: "ul",
  items: [
    "Conocer, actualizar y rectificar tus datos personales.",
    "Pedir prueba de la autorización que nos diste, salvo cuando la ley no la exija.",
    "Ser informado, cuando lo pidas, sobre el uso que les hemos dado a tus datos.",
    "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley, después de haber hecho tu consulta o reclamo ante nosotros.",
    "Revocar la autorización o pedir que borremos tus datos, cuando no exista un deber legal o contractual que nos obligue a conservarlos.",
    "Acceder gratis a tus datos personales que estén siendo tratados.",
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "tratamiento-de-datos",
    title: "Política de Tratamiento de Datos Personales",
    description:
      "Cómo recogemos, usamos, guardamos y protegemos tus datos personales, y cómo ejercer tus derechos como titular, según la Ley 1581 de 2012.",
    updated: UPDATED,
    body: [
      { type: "p", text: "Esta política explica cómo Multidiagnósticos AS trata los datos personales de sus clientes, de las personas que nos contactan y de quienes visitan este sitio web. La adoptamos en cumplimiento de la Ley 1581 de 2012 y del Decreto 1377 de 2013, hoy compilado en el Decreto 1074 de 2015." },
      { type: "h2", text: "1. Responsable del tratamiento" },
      RESPONSABLE,
      { type: "h2", text: "2. Qué datos tratamos" },
      { type: "ul", items: [
        "Datos de identificación: nombre y número de documento o NIT, cuando los necesitamos para la factura.",
        "Datos de contacto: teléfono, WhatsApp, correo electrónico y dirección.",
        "Datos de tu vehículo: placa, marca, modelo, año y kilometraje.",
        "Datos del servicio: diagnóstico, cotizaciones, órdenes de trabajo, fotos del vehículo como evidencia del trabajo, historial de servicios, pagos y garantías.",
        "Mensajes que nos envías por WhatsApp, correo, formularios del sitio o PQRS.",
      ] },
      { type: "p", text: "No pedimos datos sensibles. Si alguna vez fuera necesario, responder será siempre opcional. Tampoco tratamos de forma intencional datos de menores de edad." },
      { type: "p", text: "Si pagas por medios electrónicos, los datos de tu tarjeta o cuenta los procesa directamente la entidad financiera o la pasarela de pagos. Nosotros no los guardamos." },
      { type: "h2", text: "3. Para qué usamos tus datos" },
      { type: "ul", items: [
        "Agendar citas, recibir tu vehículo, hacer el diagnóstico, cotizar y ejecutar los trabajos.",
        "Contarte el estado de tu vehículo y enviarte cotizaciones, órdenes de trabajo, fotos del servicio y comprobantes.",
        "Vender y entregar repuestos y coordinar envíos.",
        "Emitir facturas electrónicas y cumplir nuestras obligaciones contables y tributarias.",
        "Gestionar pagos, garantías y PQRS (peticiones, quejas, reclamos y sugerencias).",
        "Enviarte recordatorios de mantenimiento, ofertas y novedades. Solo lo hacemos si lo autorizas, y puedes pedir que paremos en cualquier momento.",
        "Atender requerimientos de autoridades y cumplir la ley.",
      ] },
      { type: "h2", text: "4. Con quién compartimos tus datos" },
      { type: "p", text: "No vendemos ni alquilamos tus datos. Solo los compartimos con proveedores que nos ayudan a prestar el servicio, como alojamiento web y bases de datos, software de facturación electrónica, mensajería y pasarelas de pago. Ellos actúan como encargados: solo pueden usar los datos para la tarea que les asignamos. Algunos de estos proveedores pueden guardar la información en servidores fuera de Colombia, con medidas de seguridad adecuadas." },
      { type: "p", text: "También entregamos datos a las autoridades cuando una norma o una orden lo exige, por ejemplo a la DIAN para la facturación electrónica." },
      { type: "h2", text: "5. Cuánto tiempo los guardamos" },
      { type: "p", text: "Conservamos tus datos mientras sean necesarios para las finalidades descritas, y durante el tiempo que exijan las normas contables, tributarias y de garantía. Luego los eliminamos o los dejamos anónimos." },
      { type: "h2", text: "6. Tus derechos como titular" },
      DERECHOS,
      { type: "h2", text: "7. Cómo hacer una consulta o un reclamo" },
      { type: "p", text: `Puedes escribirnos al correo ${BUSINESS.email}, radicar una PQRS desde el sitio web (www.multidiagnosticosas.com/pqrs), escribirnos al WhatsApp ${BUSINESS.whatsapp} o ir al taller en ${BUSINESS.address}. Indica tu nombre, tu forma de contacto y qué necesitas.` },
      { type: "ul", items: [
        "Consultas (para conocer qué datos tenemos y cómo los usamos): las respondemos en máximo 10 días hábiles desde que las recibimos. Si no podemos hacerlo en ese plazo, te explicamos por qué y te respondemos en máximo 5 días hábiles más.",
        "Reclamos (para corregir, actualizar o borrar tus datos, revocar la autorización o reportar un incumplimiento): los respondemos en máximo 15 días hábiles desde que los recibimos completos. Si no podemos hacerlo en ese plazo, te explicamos por qué y te respondemos en máximo 8 días hábiles más.",
        "Si al reclamo le falta información, te la pedimos dentro de los 5 días siguientes. Si pasan 2 meses sin que la envíes, se entiende que desististe del reclamo.",
        "Mientras tu reclamo está en trámite, marcamos tus datos con la leyenda «reclamo en trámite» en un plazo máximo de 2 días hábiles.",
      ] },
      { type: "h2", text: "8. Seguridad" },
      { type: "p", text: "Aplicamos medidas técnicas, humanas y administrativas razonables para proteger tus datos contra pérdida, consulta, uso o acceso no autorizado." },
      { type: "h2", text: "9. Cambios y vigencia" },
      { type: "p", text: `Esta política rige desde el ${UPDATED}. Si hacemos cambios importantes, los publicaremos en este sitio web antes de aplicarlos.` },
    ],
  },
  {
    slug: "aviso-de-privacidad",
    title: "Aviso de Privacidad",
    description:
      "Resumen de quién trata tus datos, para qué los usamos, qué derechos tienes y dónde consultar la política completa.",
    updated: UPDATED,
    body: [
      { type: "p", text: "Multidiagnósticos AS es el responsable del tratamiento de los datos personales que nos entregas cuando agendas una cita, traes tu vehículo, compras un repuesto, nos escribes o usas este sitio web." },
      { type: "h2", text: "Datos de contacto del responsable" },
      RESPONSABLE,
      { type: "h2", text: "Para qué usamos tus datos" },
      { type: "p", text: "Para prestarte los servicios del taller y vender repuestos, comunicarnos contigo sobre tu vehículo, facturar, gestionar pagos, garantías y PQRS, y, si lo autorizas, enviarte recordatorios de mantenimiento y ofertas." },
      { type: "h2", text: "Tus derechos" },
      DERECHOS,
      { type: "p", text: "No pedimos datos sensibles. Si alguna vez lo hiciéramos, responder sería opcional." },
      { type: "h2", text: "Política completa" },
      { type: "p", text: "Puedes leer la Política de Tratamiento de Datos Personales en www.multidiagnosticosas.com/legal/tratamiento-de-datos, o pedirla en el taller. Si la cambiamos, publicaremos la nueva versión en ese mismo enlace." },
    ],
  },
  {
    slug: "autorizacion-de-datos",
    title: "Autorización para el Tratamiento de Datos Personales",
    description:
      "El texto de la autorización que nos das para tratar tus datos personales cuando nos contactas, agendas o dejas tu vehículo en el taller.",
    updated: UPDATED,
    body: [
      { type: "p", text: "Das esta autorización cuando marcas la casilla de aceptación en un formulario del sitio, cuando nos escribes por WhatsApp para agendar, cotizar o radicar una PQRS, o cuando firmas la orden de servicio en el taller." },
      { type: "h2", text: "Texto de la autorización" },
      { type: "p", text: "Autorizo de manera previa, expresa e informada a Multidiagnósticos AS, con domicilio en la Cra. 27 #13-05, Sabanalarga, Atlántico, para recoger, guardar, usar, actualizar y suprimir mis datos personales y los de mi vehículo, con estas finalidades: prestarme los servicios del taller y venderme repuestos; contactarme por teléfono, WhatsApp o correo sobre mi vehículo, mis citas, cotizaciones y órdenes de trabajo; emitir facturas y cumplir obligaciones legales; gestionar pagos, garantías y PQRS; y, si así lo indico, enviarme recordatorios de mantenimiento y ofertas." },
      { type: "p", text: "Declaro que me informaron que puedo conocer, actualizar, rectificar y pedir la supresión de mis datos, revocar esta autorización y presentar quejas ante la Superintendencia de Industria y Comercio; que responder preguntas sobre datos sensibles es opcional; y que puedo consultar la Política de Tratamiento de Datos Personales en www.multidiagnosticosas.com/legal/tratamiento-de-datos." },
      { type: "h2", text: "Cómo revocarla" },
      { type: "p", text: `Escríbenos a ${BUSINESS.email} o radica una PQRS en www.multidiagnosticosas.com/pqrs. Ten en cuenta que algunos datos, como los de las facturas, debemos conservarlos por obligación legal.` },
    ],
  },
  {
    slug: "cookies",
    title: "Política de Cookies",
    description:
      "Qué cookies usa este sitio, para qué sirven y cómo cambiar tu elección en cualquier momento.",
    updated: UPDATED,
    body: [
      { type: "h2", text: "Qué son las cookies" },
      { type: "p", text: "Son pequeños archivos que un sitio web guarda en tu navegador para recordar información entre una visita y otra." },
      { type: "h2", text: "Cookies que usamos hoy" },
      { type: "ul", items: [
        "Necesaria, propia: «mdas_consent». Guarda tu elección sobre cookies para no volver a preguntarte. Dura 6 meses. No te identifica.",
      ] },
      { type: "p", text: "Hoy no usamos cookies analíticas ni de marketing. Si en el futuro las usamos, por ejemplo para medir visitas o para publicidad, solo se activarán si las aceptas en el aviso de cookies, y actualizaremos esta política." },
      { type: "h2", text: "Servicios de terceros" },
      { type: "ul", items: [
        "Mapa de ubicación: se carga desde los servidores de Mapbox, que puede guardar datos técnicos en tu navegador para que el mapa funcione.",
        "Enlaces a WhatsApp, Instagram, Facebook, TikTok y Google Maps: cuando los abres, sales de nuestro sitio y cada servicio aplica su propia política de cookies y privacidad.",
      ] },
      { type: "h2", text: "Cómo cambiar tu elección" },
      { type: "p", text: "Usa el enlace «Configurar cookies» al pie de cualquier página para cambiar tus preferencias. También puedes borrar o bloquear las cookies desde la configuración de tu navegador." },
    ],
  },
  {
    slug: "terminos-y-condiciones",
    title: "Términos y Condiciones de Venta y Servicio",
    description:
      "Condiciones para cotizar, comprar repuestos y usar los servicios del taller: precios, garantías, derecho de retracto y PQRS.",
    updated: UPDATED,
    body: [
      { type: "p", text: "Estos términos aplican a los servicios del taller y a la venta de repuestos de Multidiagnósticos AS, en el taller o a distancia (por ejemplo, por WhatsApp con envío). Se rigen por las leyes de Colombia, en especial la Ley 1480 de 2011 (Estatuto del Consumidor)." },
      { type: "h2", text: "1. Quiénes somos" },
      RESPONSABLE,
      { type: "h2", text: "2. Cotizaciones y precios" },
      { type: "ul", items: [
        "No publicamos precios en el sitio. Te los damos en una cotización por WhatsApp o en el taller.",
        "Los precios están en pesos colombianos e incluyen IVA cuando aplica.",
        "Cada cotización indica hasta cuándo es válida. La disponibilidad de repuestos se confirma al momento de la compra.",
        "Antes de comprar un repuesto, confirmamos contigo que sirva para tu vehículo (marca, modelo, año y placa).",
      ] },
      { type: "h2", text: "3. Servicios del taller" },
      { type: "ul", items: [
        "Al recibir tu vehículo registramos su estado y abrimos una orden de trabajo.",
        "Te informamos el trabajo a realizar y su valor antes de hacerlo. Si aparece un trabajo adicional, te lo consultamos antes de ejecutarlo.",
        "Te avisamos cuando tu vehículo esté listo para que lo retires en nuestro horario de atención.",
      ] },
      { type: "h2", text: "4. Pagos y factura" },
      { type: "p", text: "Recibimos efectivo, tarjeta y transferencia. Emitimos factura electrónica por cada venta o servicio." },
      { type: "h2", text: "5. Garantía" },
      { type: "ul", items: [
        "Los repuestos tienen la garantía del fabricante y la mano de obra está respaldada por nuestro equipo. Te indicamos el término de garantía en la cotización, la orden o la factura.",
        "Para hacerla efectiva, preséntanos tu factura o el número de tu orden de trabajo.",
        "La garantía no cubre daños por mal uso, accidentes, intervenciones de terceros, desgaste normal o no seguir las instrucciones de uso.",
        "Respondemos las solicitudes de garantía en máximo 15 días hábiles.",
      ] },
      { type: "h2", text: "6. Compras a distancia: derecho de retracto" },
      { type: "p", text: "Si compraste un repuesto a distancia, por ejemplo por WhatsApp con envío, puedes retractarte dentro de los 5 días hábiles siguientes a la entrega. El producto debe devolverse sin uso, sin instalar y en su empaque original. Los costos de transporte de la devolución corren por tu cuenta. Te devolvemos el dinero en máximo 30 días calendario." },
      { type: "p", text: "El retracto no aplica a servicios del taller que ya se prestaron con tu aceptación, ni a repuestos ya instalados en tu vehículo." },
      { type: "h2", text: "7. Reversión del pago" },
      { type: "p", text: "Si pagaste con tarjeta o con otro medio electrónico en una compra a distancia, puedes pedir la reversión del pago en los casos que prevé la ley: fraude, operación no solicitada, producto no recibido, o producto que no corresponde a lo pedido o que está defectuoso. Debes pedirla dentro de los 5 días hábiles siguientes a cuando conociste el problema, avisándonos y avisando a tu banco o emisor." },
      { type: "h2", text: "8. PQRS" },
      { type: "p", text: "Puedes radicar peticiones, quejas, reclamos o sugerencias en www.multidiagnosticosas.com/pqrs. Si no estás de acuerdo con nuestra respuesta, puedes acudir a la Superintendencia de Industria y Comercio (www.sic.gov.co)." },
    ],
  },
  {
    slug: "envios-y-entregas",
    title: "Política de Envíos y Entregas",
    description:
      "Cómo recoger tu repuesto en el taller o recibirlo por envío, y qué hacer si llega dañado o no corresponde.",
    updated: UPDATED,
    body: [
      { type: "h2", text: "Recoger en el taller" },
      { type: "p", text: `Puedes recoger tu repuesto en ${BUSINESS.address}, de ${BUSINESS.hours}. Te avisamos por WhatsApp cuando esté listo.` },
      { type: "h2", text: "Envío" },
      { type: "ul", items: [
        "Coordinamos el envío por WhatsApp. Antes de que pagues te confirmamos si llegamos a tu zona, el costo del envío y el tiempo estimado de entrega.",
        "Antes de despachar confirmamos contigo la referencia y que sirva para tu vehículo.",
        "Te compartimos la información del envío para que puedas hacerle seguimiento.",
      ] },
      { type: "h2", text: "Al recibir tu pedido" },
      { type: "p", text: "Revisa el empaque y la referencia del producto. Si llegó dañado o no es lo que pediste, escríbenos de inmediato por WhatsApp con fotos y lo resolvemos." },
      { type: "h2", text: "Devoluciones y garantías" },
      { type: "p", text: "El derecho de retracto, la reversión del pago y la garantía se explican en los Términos y Condiciones de Venta y Servicio." },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}
