export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // visible
  dateISO: string; // 2026-06-03
  category: string;
  readMins: number;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "senales-carro-necesita-escaner",
    title: "5 señales de que tu carro necesita un escáner",
    description:
      "El testigo del motor encendido, tirones o más consumo de gasolina son avisos de que tu carro necesita un diagnóstico computarizado antes de que el daño crezca.",
    date: "3 de junio de 2026",
    dateISO: "2026-06-03",
    category: "Diagnóstico",
    readMins: 4,
    body: [
      { type: "p", text: "El carro casi siempre avisa antes de fallar en grande. El problema es que muchos talleres no tienen el equipo para leer esos avisos, o lo tienen y no saben interpretarlo, así que terminan cambiando piezas a la adivinanza. Con un escáner se leen los códigos que guarda la computadora del carro y se sabe con datos qué está pasando. Estas son cinco señales claras de que ya es momento de hacerlo." },
      { type: "h2", text: "1. El testigo del motor está encendido" },
      { type: "p", text: "La luz de check engine no siempre significa algo grave, pero nunca es para ignorarla. Puede ser desde un sensor sucio hasta una falla que está dañando otras piezas. El escáner dice exactamente qué código se guardó y por dónde empezar." },
      { type: "h2", text: "2. Tirones o pérdida de fuerza" },
      { type: "p", text: "Si el carro tironea al acelerar o sientes que ya no tiene la misma fuerza, suele ser inyección, encendido o un sensor reportando mal. Son fallas que el escáner ayuda a ubicar rápido." },
      { type: "h2", text: "3. Está gastando más gasolina" },
      { type: "p", text: "Un consumo que sube sin explicación es una de las señales más comunes de un sensor trabajando mal (oxígeno, flujo de aire, temperatura). El motor compensa quemando de más y tú lo pagas en el tanque." },
      { type: "h2", text: "4. Ralentí inestable o se apaga solo" },
      { type: "p", text: "Cuando el carro está quieto y las revoluciones suben y bajan, vibra de más o se apaga, casi siempre hay algo en la mezcla o el encendido. Conviene leerlo antes de que te deje varado." },
      { type: "h2", text: "5. Fallas eléctricas raras" },
      { type: "p", text: "Testigos que prenden y apagan, vidrios o luces con comportamiento extraño, accesorios que fallan por momentos. Muchas de estas fallas quedan registradas en los módulos del carro y se leen con el equipo correcto." },
      { type: "h2", text: "Cómo lo hacemos nosotros" },
      { type: "p", text: "En Multidiagnósticos AS usamos un equipo Launch X-431 compatible con más de 100 marcas. Leemos los códigos, te explicamos en palabras claras qué significan y te damos la recomendación honesta de reparación. Nada de cambiar piezas por si acaso." },
    ],
  },
  {
    slug: "cada-cuanto-cambiar-aceite",
    title: "¿Cada cuánto se cambia el aceite del carro?",
    description:
      "Guía simple para saber cada cuántos kilómetros cambiar el aceite según el tipo de aceite y tu forma de manejar, y por qué hacerlo a tiempo te evita reparaciones caras.",
    date: "28 de mayo de 2026",
    dateISO: "2026-05-28",
    category: "Mantenimiento",
    readMins: 4,
    body: [
      { type: "p", text: "El cambio de aceite es el mantenimiento más importante y, al mismo tiempo, el más descuidado. Un aceite vencido deja de proteger el motor y el desgaste se vuelve daño. La buena noticia: es barato y rápido comparado con lo que cuesta una reparación de motor." },
      { type: "h2", text: "¿Cada cuántos kilómetros?" },
      { type: "p", text: "Depende del tipo de aceite que use tu carro. Como referencia general:" },
      { type: "ul", items: [
        "Aceite mineral: alrededor de 5.000 km.",
        "Aceite semisintético: alrededor de 7.500 km.",
        "Aceite sintético: hasta 10.000 km.",
      ] },
      { type: "p", text: "Lo ideal es seguir lo que dice el manual de tu carro y ajustarlo a cómo manejas." },
      { type: "h2", text: "Tu forma de manejar cambia todo" },
      { type: "p", text: "Estas condiciones desgastan el aceite más rápido, así que conviene cambiarlo antes del kilometraje:" },
      { type: "ul", items: [
        "Mucho trancón y trayectos cortos en ciudad.",
        "Vías destapadas y polvo (común en la región).",
        "Calor fuerte y manejo cargado o con remolque.",
      ] },
      { type: "h2", text: "Señales de que ya tocaba" },
      { type: "ul", items: [
        "El aceite se ve negro y espeso en la varilla.",
        "Se enciende el testigo de aceite.",
        "El motor suena más duro o caliente de lo normal.",
        "Olor a aceite quemado.",
      ] },
      { type: "h2", text: "No es solo el aceite: el filtro también" },
      { type: "p", text: "Cambiar el aceite sin cambiar el filtro es dejar el trabajo a medias. En cada cambio reemplazamos el filtro y hacemos una revisión multipunto, y te dejamos anotado el kilometraje del próximo cambio para que no se te pase." },
    ],
  },
  {
    slug: "frenos-cuando-cambiar-pastillas-discos",
    title: "Frenos: cuándo cambiar pastillas y discos",
    description:
      "Chirridos, vibración al frenar o pedal esponjoso son señales de que tus frenos están al límite. Aprende a identificarlas para cambiar pastillas y discos a tiempo.",
    date: "20 de mayo de 2026",
    dateISO: "2026-05-20",
    category: "Seguridad",
    readMins: 3,
    body: [
      { type: "p", text: "Los frenos son lo último en lo que deberías ahorrar. Una revisión a tiempo cuesta poco; frenar mal puede costar mucho más. Estas son las señales de que tus pastillas o discos ya piden atención." },
      { type: "h2", text: "Chirrido metálico al frenar" },
      { type: "p", text: "Muchas pastillas traen un testigo que chilla cuando están gastadas. Si escuchas un chirrido agudo al frenar, es la pista de que ya están al límite. Si suena como un raspado fuerte, puede que el disco ya se esté dañando." },
      { type: "h2", text: "Vibración en el pedal o el volante" },
      { type: "p", text: "Si al frenar sientes que el pedal o el volante vibran, suele ser por discos desgastados o deformados. No es normal y conviene revisarlo pronto." },
      { type: "h2", text: "El pedal se siente bajo o esponjoso" },
      { type: "p", text: "Cuando el pedal se hunde más de lo normal o lo sientes blando, puede haber desgaste, aire en el sistema o falta de líquido. Es una señal para no seguir manejando sin revisar." },
      { type: "h2", text: "¿Cada cuánto se revisan?" },
      { type: "ul", items: [
        "Pastillas: suelen durar entre 20.000 y 40.000 km según el manejo.",
        "Discos: duran más, pero se desgastan y se deforman con el tiempo.",
        "Lo más fácil: pedir revisión de frenos en cada cambio de aceite.",
      ] },
      { type: "h2", text: "Revisión honesta" },
      { type: "p", text: "En Multidiagnósticos AS te mostramos el desgaste real de tus frenos y te decimos qué necesita cambio y qué todavía aguanta. Sin venderte piezas que no necesitas." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
