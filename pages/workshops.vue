<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-28 pb-10 px-6 md:px-12 bg-dark">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center" v-for="(workshop, i) in workshops" :key="i">
        <h1 class="text-4xl md:text-5xl font-bold text-white">Workshops del <span class="text-accent">Mes</span></h1>
        <br>
        <!-- Imagen del taller -->
        <div>
          <img :src="workshop.foto_taller" alt="Foto del taller" class="rounded-xl shadow-lg w-full h-auto object-cover">
          <!-- ¿Qué aprenderás? -->
          <div class="mt-8">
            <h2 class="text-xl md:text-2xl font-bold mb-2 text-accent">¿Qué aprenderás?</h2>
            <p class="mb-2 text-light">{{ workshop.Descripcion }}</p>
          </div>
        </div>
        <!-- Información -->
        <div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2 text-accent">{{ workshop.workshop_name }}</h1>
          <div class="mb-4">
            <span class="block text-lg font-semibold text-white px-2 border-t-2 border-b-2 border-accent py-1">
              {{ workshop.fecha_inicio }} al {{ workshop.fecha_termino }}
            </span>
          </div>
          <p class="mb-4 text-light">{{ workshop.descripcion_instructor }}</p>
          <div class="mb-8">
            <h3 class="text-2xl font-bold mb-4 text-white">Conoce a tu instructor</h3>
            <div class="relative w-full rounded-xl overflow-hidden bg-black">
              <img :src="workshop.foto_instructor" alt="Foto del instructor" class="w-full h-auto object-cover aspect-video mx-auto">
            </div>
          </div>
          <ul class="text-sm space-y-2 mb-6 text-light">
            <li><span class="icon-calendar"></span> <strong class="text-white">{{ workshop.fecha_inicio }}</strong> – <span>{{ workshop.fecha_termino }}</span></li>
            <li><span class="icon-laptop"></span> {{ workshop.modalidad }}</li>
            <li><span class="icon-book"></span> {{ workshop.materiales }}</li>
            <li><span class="icon-certificate"></span> {{ workshop.certificado }}</li>
          </ul>
          <!-- Puedes agregar botones de acción aquí si tu API entrega links -->
          <div class="space-y-4">
              <a href="#" target="_blank" class="block w-full text-center py-3 rounded-lg transition font-semibold" style="border: 1.5px solid rgb(59, 167, 227); color: rgb(59, 167, 227); background: transparent;" onmouseover="this.style.backgroundColor='rgb(59,167,227)';this.style.color='white'" onmouseout="this.style.backgroundColor='transparent';this.style.color='rgb(59,167,227)'">
                  Descargar Temario
              </a>
              <a href="#" target="_blank" class="block w-full text-center py-3 rounded-lg font-bold transition text-white" style="background-color: rgb(59, 167, 227); opacity: 1;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                  Inscribirme – $89.000
              </a>
          </div>
        </div>
        <!-- Temario visual -->
        <section class="py-20 bg-dark">
          <div class="max-w-4xl mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8 text-center text-white">Temario General</h2>
            <ol class="space-y-2 text-lg list-decimal list-inside text-light">
              <li v-for="(item, idx) in workshop.temario" :key="idx">
                {{ typeof item === 'string' ? item : item.contenido }}
              </li>
            </ol>
          </div>
        </section>
      </div>
    </section>

    <!-- Roadmap de Próximos Workshops Mejorado -->
    <section class="py-20 px-4 bg-black">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-white">Roadmap de Próximos Workshops</h2>
        
        <!-- Julio 2025 -->
        <div class="mb-12">
          <h3 class="text-2xl font-semibold text-accent mb-6 border-b border-accent pb-2">
            Julio 2025
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(workshop, index) in upcomingWorkshopsJulio" :key="'julio-' + index" class="bg-dark rounded-xl p-6 border border-gray-700 hover:border-accent transition-colors">
              <div class="flex gap-4">
                <!-- Imagen reducida -->
                <div class="flex-shrink-0">
                  <img :src="workshop.foto_taller" alt="Foto del taller" class="w-24 h-24 object-cover rounded-lg">
                </div>
                <!-- Información -->
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">{{ workshop.workshop_name }}</h4>
                  <div class="text-sm text-light mb-2">
                    <span class="icon-calendar"></span> {{ workshop.fecha_inicio }} - {{ workshop.fecha_termino }}
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <img :src="workshop.foto_instructor" alt="Instructor" class="w-8 h-8 rounded-full object-cover">
                    <span class="text-sm text-light">{{ workshop.instructor_name }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2 text-xs mb-3">
                    <span class="bg-accent/20 text-accent px-2 py-1 rounded">{{ workshop.modalidad }}</span>
                    <span class="bg-gray-700 text-light px-2 py-1 rounded">{{ workshop.certificado }}</span>
                  </div>
                  <p class="text-sm text-light line-clamp-2">{{ workshop.Descripcion }}</p>
                </div>
              </div>
              <!-- Botones de acción compactos -->
              <div class="mt-4 flex gap-2">
                <button class="flex-1 py-2 px-3 text-sm border border-accent text-accent rounded hover:bg-accent hover:text-white transition">
                  Ver Temario
                </button>
                <button class="flex-1 py-2 px-3 text-sm bg-accent text-white rounded hover:bg-accent/90 transition">
                  Inscribirme
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Agosto 2025 -->
        <div class="mb-12">
          <h3 class="text-2xl font-semibold text-accent mb-6 border-b border-accent pb-2">
            Agosto 2025
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(workshop, index) in upcomingWorkshopsAgosto" :key="'agosto-' + index" class="bg-dark rounded-xl p-6 border border-gray-700 hover:border-accent transition-colors">
              <div class="flex gap-4">
                <!-- Imagen reducida -->
                <div class="flex-shrink-0">
                  <img :src="workshop.foto_taller" alt="Foto del taller" class="w-24 h-24 object-cover rounded-lg">
                </div>
                <!-- Información -->
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">{{ workshop.workshop_name }}</h4>
                  <div class="text-sm text-light mb-2">
                    <span class="icon-calendar"></span> {{ workshop.fecha_inicio }} - {{ workshop.fecha_termino }}
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <img :src="workshop.foto_instructor" alt="Instructor" class="w-8 h-8 rounded-full object-cover">
                    <span class="text-sm text-light">{{ workshop.instructor_name }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2 text-xs mb-3">
                    <span class="bg-accent/20 text-accent px-2 py-1 rounded">{{ workshop.modalidad }}</span>
                    <span class="bg-gray-700 text-light px-2 py-1 rounded">{{ workshop.certificado }}</span>
                  </div>
                  <p class="text-sm text-light line-clamp-2">{{ workshop.Descripcion }}</p>
                </div>
              </div>
              <!-- Botones de acción compactos -->
              <div class="mt-4 flex gap-2">
                <button class="flex-1 py-2 px-3 text-sm border border-accent text-accent rounded hover:bg-accent hover:text-white transition">
                  Ver Temario
                </button>
                <button class="flex-1 py-2 px-3 text-sm bg-accent text-white rounded hover:bg-accent/90 transition">
                  Inscribirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonios Carrusel -->
    <section class="py-20 bg-dark">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-white">
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
    </section>

    <!-- Preguntas Frecuentes -->
    <section class="py-20 px-4 bg-black">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-white">Preguntas Frecuentes</h2>
        <dl class="space-y-8">
          <div v-for="(faq, index) in faqs" :key="index">
            <dt class="text-xl font-semibold text-white">{{ faq.question }}</dt>
            <dd class="mt-2 text-light">{{ faq.answer }}</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  mounted() {
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
    this.fetchWorkshops()
  },
  methods: {
    async fetchWorkshops() {
      await this.$api.get('api/workshops?populate=foto_taller,foto_instructor,Temario').then(res => {
        const now = new Date().getTime()
        
        // Workshops del mes (próximos 3)
        this.workshops = res.data.data
          .filter(workshop => new Date(workshop.attributes.fecha_inicio).getTime() > now)
          .sort((a, b) => new Date(a.attributes.fecha_inicio) - new Date(b.attributes.fecha_inicio))
          .slice(0, 3)
          .map(workshop => {
            return {
              ...workshop.attributes,
              fecha_inicio: new Date(workshop.attributes.fecha_inicio).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              fecha_termino: new Date(workshop.attributes.fecha_termino).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              foto_taller: workshop.attributes.foto_taller.data.attributes.url,
              foto_instructor: workshop.attributes.foto_instructor.data.attributes.url,
              temario: workshop.attributes.Temario,
            }
          })

        // Filtrar workshops para roadmap por mes
        const allWorkshops = res.data.data
          .filter(workshop => new Date(workshop.attributes.fecha_inicio).getTime() > now)
          .sort((a, b) => new Date(a.attributes.fecha_inicio) - new Date(b.attributes.fecha_inicio))
          .map(workshop => {
            const fechaInicio = new Date(workshop.attributes.fecha_inicio)
            return {
              ...workshop.attributes,
              fecha_inicio: fechaInicio.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              fecha_termino: new Date(workshop.attributes.fecha_termino).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
              foto_taller: workshop.attributes.foto_taller.data.attributes.url,
              foto_instructor: workshop.attributes.foto_instructor.data.attributes.url,
              instructor_name: workshop.attributes.instructor_name || "Instructor",
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

.bg-dark {
  background: var(--darkgray);
}
.bg-black {
  background: var(--black);
}
.text-accent {
  color: var(--primary);
}
.text-light {
  color: #b6c2d1;
}
.text-gray {
  color: #d1d5db;
}
.bg-accent {
  background: var(--primary) !important;
}
.border-accent {
  border-color: var(--primary) !important;
}

// Iconos de ejemplo (puedes reemplazar por componentes reales o SVGs)
.icon-calendar::before { content: "\1F4C5 "; }
.icon-laptop::before { content: "\1F4BB "; }
.icon-book::before { content: "\1F4D8 "; }
.icon-certificate::before { content: "\1F4DC "; }

.testimonios-carousel {
  .testimonios-track {
    &:hover {
      animation-play-state: paused;
    }
  }
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

// Utilidad para truncar texto
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>