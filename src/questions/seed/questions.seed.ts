import { QuestionCategoryModel } from '../models/questionCategory.model';

const questions: QuestionCategoryModel[] = [
  {
    id: 1,
    name: 'Preguntas generales',
    description:
      'Preguntas generales que serán para conocer las necesidades básicas de tu computadora de escritorio.',
    questions: [
      {
        label: 'pg-time_on_day',
        content: '¿Qué tiempo permanecerá encendida al día?',
        isMultipleChoice: false,
        questionCategoryId: 1,
        options: [
          {
            questionLabel: 'pg-time_on_day',
            position: 1,
            content: 'Menos de 4 horas',
          },
          {
            questionLabel: 'pg-time_on_day',
            position: 2,
            content: 'Entre 4 horas a 8 horas',
          },
          {
            questionLabel: 'pg-time_on_day',
            position: 3,
            content: 'Entre 8 horas a 12 horas',
          },
          {
            questionLabel: 'pg-time_on_day',
            position: 4,
            content: 'Entre 12 horas a 16 horas',
          },
          {
            questionLabel: 'pg-time_on_day',
            position: 5,
            content: 'Entre 16 horas a 24 horas',
          },
          {
            questionLabel: 'pg-time_on_day',
            position: 6,
            content: 'No estoy seguro',
          },
        ],
      },
      {
        label: 'pg-store',
        content: '¿Cuánto necesitas almacenar en tu computadora?',
        isMultipleChoice: false,
        questionCategoryId: 1,
        options: [],
      },
      {
        label: 'pg-use_of_computer',
        content: '¿Qué uso se le dará a la nueva PC?',
        isMultipleChoice: true,
        questionCategoryId: 1,
        options: [
          {
            questionLabel: 'pg-use_of_computer',
            position: 1,
            content: 'Gaming',
          },
          {
            questionLabel: 'pg-use_of_computer',
            position: 2,
            content: 'Oficina',
          },
          {
            questionLabel: 'pg-use_of_computer',
            position: 3,
            content: 'Streaming de video',
          },
          {
            questionLabel: 'pg-use_of_computer',
            position: 4,
            content: 'Edición multimedia (imágenes, video y/o audio)',
          },
          {
            questionLabel: 'pg-use_of_computer',
            position: 5,
            content: 'Desarrollo de software',
          },
          {
            questionLabel: 'pg-use_of_computer',
            position: 6,
            content: 'Construcción civil (Ingeniería civil, arquitectura)',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Gaming',
    description:
      'Saca el máximo provecho a tu presupuesto y mejora tu experiencia en los videojuegos.',
    questions: [
      {
        label: 'gaming-videogame_categories',
        content: '¿Qué tipo de videojuegos jugarás?',
        isMultipleChoice: true,
        questionCategoryId: 2,
        options: [
          {
            questionLabel: 'gaming-videogame_categories',
            position: 1,
            content: 'Competitivos (Ej: CSGO, Overwatch, Valorant)',
          },
          {
            questionLabel: 'gaming-videogame_categories',
            position: 2,
            content:
              'Triple A (Ej: Cyberpunk 2077, Dying Light 2, Elden Ring, etc)',
          },
          {
            questionLabel: 'gaming-videogame_categories',
            position: 3,
            content: 'Indies',
          },
          {
            questionLabel: 'gaming-videogame_categories',
            position: 4,
            content: 'Simulación',
          },
          {
            questionLabel: 'gaming-videogame_categories',
            position: 5,
            content: 'Otros',
          },
        ],
      },
      {
        label: 'gaming-emulators',
        content: '¿Qué emuladores de consolas usarás?',
        isMultipleChoice: true,
        questionCategoryId: 2,
        options: [
          {
            questionLabel: 'gaming-emulators',
            position: 1,
            content: 'Consolas PlayStation',
          },
          {
            questionLabel: 'gaming-emulators',
            position: 2,
            content: 'Consolas de Nintendo',
          },
          {
            questionLabel: 'gaming-emulators',
            position: 3,
            content: 'Consolas retro',
          },
          {
            questionLabel: 'gaming-emulators',
            position: 4,
            content: 'Android',
          },
        ],
      },
      {
        label: 'gaming-quality',
        content: '¿A qué calidad deseas jugar en la mayoría de títulos?',
        isMultipleChoice: false,
        questionCategoryId: 2,
        options: [
          {
            questionLabel: 'gaming-quality',
            position: 1,
            content: 'Baja',
          },
          {
            questionLabel: 'gaming-quality',
            position: 2,
            content: 'Media',
          },
          {
            questionLabel: 'gaming-quality',
            position: 3,
            content: 'Alta',
          },
          {
            questionLabel: 'gaming-quality',
            position: 4,
            content: 'Ultra',
          },
          {
            questionLabel: 'gaming-quality',
            position: 5,
            content: 'Cualquiera',
          },
        ],
      },
      {
        label: 'gaming-fps',
        content:
          '¿Cuántos FPS (Cuadros por segundo) en promedio deseas obtener en la mayoría de títulos?',
        isMultipleChoice: false,
        questionCategoryId: 2,
        options: [
          {
            questionLabel: 'gaming-fps',
            position: 1,
            content: '60 FPS',
          },
          {
            questionLabel: 'gaming-fps',
            position: 2,
            content: '75 FPS',
          },
          {
            questionLabel: 'gaming-fps',
            position: 3,
            content: '120 FPS',
          },
          {
            questionLabel: 'gaming-fps',
            position: 4,
            content: '144 FPS',
          },
          {
            questionLabel: 'gaming-fps',
            position: 5,
            content: 'Más de 144 FPS',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Oficina',
    description:
      'Consigue la computadora adecuada para tu trabajo y mejora tu experiencia en el mismo.',
    questions: [
      {
        label: 'office-space',
        content:
          '¿Cuánto espacio quieres que ocupe la computadora en tu zona de trabajo?',
        isMultipleChoice: false,
        questionCategoryId: 3,
        options: [
          {
            questionLabel: 'office-space',
            position: 1,
            content: 'Poco (En mesas o escritorios)',
          },
          {
            questionLabel: 'office-space',
            position: 2,
            content: 'Mucho (Debajo de la mesa o en un espacio dedicado)',
          },
        ],
      },
      {
        label: 'office-max_windows',
        content: '¿Sueles abrir más de 3 ventanas a la vez?',
        isMultipleChoice: false,
        questionCategoryId: 3,
        options: [
          {
            questionLabel: 'office-max_windows',
            position: 1,
            content: 'Sí',
          },
          {
            questionLabel: 'office-max_windows',
            position: 2,
            content: 'No',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Streaming de video',
    description:
      'Transmite lo que desees en la calidad que necesites sin dejar de lado tu experiencia y la de tus espectadores.',
    questions: [
      {
        label: 'streaming-video_quality',
        content: '¿A qué calidad de video deseas streamear?',
        isMultipleChoice: false,
        questionCategoryId: 4,
        options: [
          {
            questionLabel: 'streaming-video_quality',
            position: 1,
            content:
              '1080p 60FPS (Alta calidad, contenido con poco movimiento)',
          },
          {
            questionLabel: 'streaming-video_quality',
            position: 1,
            content:
              '900p 60FPS (Alta calidad, contenido con mucho movimiento)',
          },
          {
            questionLabel: 'streaming-video_quality',
            position: 1,
            content: '720p 60FPS (Calidad media, conexiones lentas)',
          },
          {
            questionLabel: 'streaming-video_quality',
            position: 1,
            content: '720p 30FPS (Streaming básico)',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Edición multimedia',
    description:
      'Elabora videos, fotos o música para que puedas compartir con tus amigos y familiares usando las mejores prestaciones disponibles en el mercado.',
    questions: [
      {
        label: 'multimedia-file_types',
        content: '¿Con qué tipo de archivos trabajas?',
        isMultipleChoice: true,
        questionCategoryId: 5,
        options: [
          {
            questionLabel: 'multimedia-file_types',
            position: 1,
            content: 'Audio',
          },
          {
            questionLabel: 'multimedia-file_types',
            position: 2,
            content: 'Video',
          },
          {
            questionLabel: 'multimedia-file_types',
            position: 3,
            content: 'Imagen',
          },
        ],
      },
      {
        label: 'multimedia-experience',
        content:
          '¿Qué nivel de experiencia tienes trabajando con estos tipos de archivos?',
        isMultipleChoice: false,
        questionCategoryId: 5,
        options: [
          {
            questionLabel: 'multimedia-experience',
            position: 1,
            content: 'Básico',
          },
          {
            questionLabel: 'multimedia-experience',
            position: 2,
            content: 'Intermedio',
          },
          {
            questionLabel: 'multimedia-experience',
            position: 3,
            content: 'Avanzado',
          },
          {
            questionLabel: 'multimedia-experience',
            position: 4,
            content: 'Profesional',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Desarrollo de software',
    description:
      'Desarrolla tus propios juegos o aplicaciones utilizando las mejores herramientas.',
    questions: [
      {
        label: 'software-platforms',
        content: '¿Qué tipo de aplicaciones desarrollas?',
        isMultipleChoice: true,
        questionCategoryId: 6,
        options: [
          {
            questionLabel: 'software-platforms',
            position: 1,
            content: 'Web',
          },
          {
            questionLabel: 'software-platforms',
            position: 2,
            content: 'Escritorio',
          },
          {
            questionLabel: 'software-platforms',
            position: 3,
            content: 'Móviles',
          },
        ],
      },
      {
        label: 'software-os',
        content: '¿Qué sistema operativo usarás?',
        isMultipleChoice: false,
        questionCategoryId: 6,
        options: [
          {
            questionLabel: 'software-os',
            position: 1,
            content: 'Windows 10 o Windows 11',
          },
          {
            questionLabel: 'software-os',
            position: 2,
            content: 'Windows con WSL',
          },
          {
            questionLabel: 'software-os',
            position: 3,
            content: 'Distribución de Linux',
          },
        ],
      },
      {
        label: 'software-ia',
        content: '¿Desarrollas modelos de Inteligencia Artificial?',
        isMultipleChoice: false,
        questionCategoryId: 6,
        options: [
          {
            questionLabel: 'software-ia',
            position: 1,
            content: 'Sí',
          },
          {
            questionLabel: 'software-ia',
            position: 2,
            content: 'No',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'Construcción civil',
    description: 'Diseña planos y edificaciones digitales.',
    questions: [
      {
        label: 'construction-activities',
        content:
          '¿Qué actividades con respecto a la construcción civil realizas en la computadora?',
        isMultipleChoice: false,
        questionCategoryId: 7,
        options: [
          {
            questionLabel: 'construction-activities',
            position: 1,
            content: 'Diseño de planos',
          },
          {
            questionLabel: 'construction-activities',
            position: 2,
            content: 'Diseño de modelos 3D',
          },
        ],
      },
    ],
  },
];

export default questions;
