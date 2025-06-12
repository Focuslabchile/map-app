<template>
  <div>
    <!-- Hero Section -->
    <AppSection background="secondary">
      <h1 class="text-4xl md:text-5xl font-bold">Workshops del <span class="text-accent">Mes</span></h1>
      <Workshop :workshop="workshop" v-for="(workshop, i) in workshops" :key="i"/>
    </AppSection>

    <!-- Roadmap de Próximos Workshops Mejorado -->
    <AppSection background="primary">
      <div>
        <h2 class="text-3xl font-bold text-center mb-12">Roadmap de <span class="text-accent">Próximos Workshops</span></h2>
        
        <!-- Julio 2025 -->
        <div class="mb-12">
          <h3 class="text-2xl font-semibold text-accent mb-6 border-b border-accent pb-2">
            Julio 2025
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(workshop, index) in upcomingWorkshopsJulio" :key="'julio-' + index" class="secondary rounded-xl p-6 transition-colors">
              <div class="flex gap-4">
                <!-- Imagen reducida -->
                <div class="flex-shrink-0">
                  <img :src="workshop.foto_taller" alt="Foto del taller" class="w-24 h-24 object-cover rounded-lg">
                </div>
                <!-- Información -->
                <div class="flex-1">
                  <h4 class="text-lg font-bold mb-2">{{ workshop.workshop_name }}</h4>
                  <div class="text-sm text-light mb-2">
                    <span class="icon-calendar"></span> {{ workshop.fecha_inicio }} - {{ workshop.fecha_termino }}
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <img :src="workshop.foto_instructor" alt="Instructor" class="w-8 h-8 rounded-full object-cover">
                    <span class="text-sm text-light">{{ workshop.instructor_name }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2 text-xs mb-3 font-semibold">
                    <span class="bg-gray2 text-accent px-2 py-1 rounded">{{ workshop.modalidad }}</span>
                    <span class="bg-accent text-gray2 px-2 py-1 rounded">{{ workshop.certificado }}</span>
                  </div>
                </div>
              </div>
              <!-- Botones de acción compactos -->
              <div class="mt-4 flex gap-2">
                <a
                  :href="workshop.temario"
                  target="_blank"
                  class="text-center font-semibold flex-1 py-2 px-3 text-sm border border-accent text-accent rounded
                        hover:bg-accent hover:text-white transition">
                  Ver Temario
                </a>
                <nuxt-link :to="'/workshops/'+workshop.id" class="text-center flex-1 py-2 px-3 text-sm bg-accent text-white rounded hover:bg-accent/90 transition">
                  Ver más
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppSection>

    <!-- Testimonios Carrusel -->
    <AppSection background="secondary">
      <div class="text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-12">
          Testimonios de <span class="text-accent">participantes</span>
        </h2>
        <div class="testimonios-carousel overflow-hidden relative">
          <div class="testimonios-track inline-flex" :style="{ animation: 'scroll 18s linear infinite' }">
            <figure v-for="(testimonio, index) in testimonios" :key="index" class="rounded-xl shadow-lg p-8 flex flex-col h-full justify-between mx-4 bg-black min-w-[320px] max-w-[350px]">
              <blockquote class="mb-4 text-xl text-light">{{ testimonio.quote }}</blockquote>
              <figcaption class="text-lg font-semibold text-white">{{ testimonio.author }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </AppSection>

    <!-- Logos -->
    <AppSection background="primary">
      <div>
        <h2 class="text-4xl font-bold text-center mb-16">
          Clientes y Partners
        </h2>

        <!-- Carrusel de logos -->
        <div class="clients-carousel">
          <div class="clients-track">
            <img v-for="(logo, idx) in logos" :key="logo.id+'-'+idx" class="client-logo" :src="logo.imagen" alt="">
          </div>
        </div>
      </div>
    </AppSection>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logos: [],
      workshops: [],
      upcomingWorkshopsJulio: [],
      upcomingWorkshopsAgosto: [],
      countdownText: '',
      testimonios: [
        {
          quote: "Excelente consultoría, clara y con ejemplos reales. El relator domina completamente el tema.",
          author: "Carlos R., Técnico eléctrico"
        },
        {
          quote: "Muy útil para quienes trabajamos en terreno. Me ayudó a entender mejor las mediciones de mallas.",
          author: "María L., Ingeniera en ejecución"
        }
      ],
      faqs: [
        {
          question: "¿Necesito experiencia previa?",
          answer: "No es obligatoria, pero se recomienda tener conocimientos básicos en electricidad."
        },
        {
          question: "¿Entregan certificado?",
          answer: "Sí, recibirás un certificado digital de participación."
        }
      ]
    }
  },
  async asyncData(context) {
    const logos = await context.$api.get('api/inicio?populate=Header_Slider.Imagen').then(res => {
      return res.data.data.attributes.Header_Slider
      .map(el => {
        return {
          titulo: el.Titulo,
          bajada: el.Bajada,
          id: el.id,
          imagen: el.Imagen.data.attributes.url
        }
      })
    })
    return { logos }
  },
  mounted() {
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
    this.fetchWorkshops()
  },
  computed: {
    // Devuelve dos copias seguidas → [logo1, logo2, …, logoN, logo1, logo2, …]
    logosDuplicados() {
      return this.logos.length
      ? [...this.logos, ...this.logos]   // dos copias
      : [];
    }
  },
  methods: {
    async fetchWorkshops() {
      await this.$api.get('api/workshops?populate=foto_taller,foto_instructor,temario').then(res => {
        const now = new Date().getTime()
        
        // Workshops del mes (próximos 3)
        this.workshops = res.data.data
          .filter(workshop => new Date(workshop.attributes.fecha_termino).getTime() > now)
          .sort((a, b) => new Date(a.attributes.fecha_inicio) - new Date(b.attributes.fecha_inicio))
          .slice(0, 3)
          .map(workshop => {
            return {
              ...workshop.attributes,
              id: workshop.id,
              fecha_inicio: new Date(workshop.attributes.fecha_inicio).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              fecha_termino: new Date(workshop.attributes.fecha_termino).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              foto_taller: workshop.attributes.foto_taller.data.attributes.url,
              temario: workshop.attributes.temario?.data?.attributes.url,
              foto_instructor: workshop.attributes.foto_instructor?.data?.attributes.url,
            }
          })

        // Filtrar workshops para roadmap por mes
        const allWorkshops = res.data.data
          .filter(workshop => new Date(workshop.attributes.fecha_termino).getTime() > now)
          .sort((a, b) => new Date(a.attributes.fecha_inicio) - new Date(b.attributes.fecha_inicio))
          .map(workshop => {
            const fechaInicio = new Date(workshop.attributes.fecha_inicio)
            return {
              ...workshop.attributes,
              id: workshop.id,
              fecha_inicio: fechaInicio.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              fecha_termino: new Date(workshop.attributes.fecha_termino).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              foto_taller: workshop.attributes.foto_taller?.data?.attributes.url,
              foto_instructor: workshop.attributes.foto_instructor?.data?.attributes.url,
              instructor_name: workshop.attributes.instructor_name || "Instructor",
              temario: workshop.attributes.temario?.data?.attributes.url,
              month: fechaInicio.getMonth() + 1, // Para filtrar por mes
              year: fechaInicio.getFullYear()
            }
          })

        // Separar por meses
        this.upcomingWorkshopsJulio = allWorkshops
        this.upcomingWorkshopsAgosto = allWorkshops
      })
    },
    updateCountdown() {
      const deadline = new Date("July 8, 2025 23:59:59").getTime();
      const now = new Date().getTime();
      const diff = deadline - now;
      
      if (diff < 0) {
        this.countdownText = "¡Cierre finalizado!";
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        this.countdownText = `Inscripciones cierran en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/colors.scss';

// Iconos de ejemplo (puedes reemplazar por componentes reales o SVGs)
.icon-calendar::before { content: "\1F4C5 "; }
.icon-laptop::before { content: "\1F4BB "; }
.icon-book::before { content: "\1F4D8 "; }
.icon-certificate::before { content: "\1F4DC "; }
.icon-payments::before { content: "\1F4B3 ";}

.testimonios-carousel {
  &:hover {
    .testimonios-track {
      animation-play-state: paused;
    }
  }
}

/* Contenedor: oculta el desborde para el “deslizamiento infinito” */
.clients-carousel {
  position: relative;
  overflow: hidden;
  &:hover {
    .clients-track {
      animation-play-state: paused;
    }
  }
}

/* Pista de logos: fila horizontal que se anima continuamente */
.clients-track {
  @apply flex items-center whitespace-nowrap select-none;
  animation: scroll 30s linear infinite;     /* ajusta la duración a tu gusto */
}

/* Cada logo: tamaño coherente, margen y efecto gris que se aclara al pasar */
.client-logo {
  @apply h-20 w-auto mx-6 flex-shrink-0    /* mismo alto para todos; margen lateral */
         object-contain                    /* mantiene relación original */
         grayscale opacity-70 transition;  /* estilo inicial */

  &:hover {
    @apply grayscale-0 opacity-100;        /* resalta al pasar el cursor */
  }
}
.client-logo:first-child { margin-left: 0; }
/* Animación: desplaza la pista hacia la izquierda la mitad de su anchura
   (se duplica el set de logos en tu markup para lograr bucle perfecto) */
@keyframes scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-190%); }
}

// Utilidad para truncar texto
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>