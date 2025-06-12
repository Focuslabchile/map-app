<template>
  <div class="grid md:grid-cols-2 gap-10 items-start" v-if="workshop">
    <Modal :open.sync="inscripcionEmpresa" title="Inscripción como empresa">
      <p class="mb-4 text-sm">
        Para inscribirse como empresa y recibir factura, realice una <strong>transferencia
        por el monto indicado en el curso</strong> a la cuenta detallada a continuación.
      </p>
      <!-- Datos de pago -->
      <table class="min-w-[280px] text-sm">
        <tr>
          <th class="text-left pr-4">Nombre</th>
          <td>INGENIERÍA&nbsp;MYZ</td>
        </tr>
        <tr>
          <th class="text-left pr-4">RUT</th>
          <td>77.430.473-8</td>
        </tr>
        <tr>
          <th class="text-left pr-4">Método de pago</th>
          <td>Mercado&nbsp;Pago</td>
        </tr>
        <tr>
          <th class="text-left pr-4">Tipo de cuenta</th>
          <td>Cuenta&nbsp;Vista</td>
        </tr>
        <tr>
          <th class="text-left pr-4">N.º de cuenta</th>
          <td>1014075600</td>
        </tr>
        <tr>
          <th class="text-left pr-4">Enviar comprobante</th>
          <td>Nataliainfomap@gmail.com / +56 9 3068 9517</td>
        </tr>
      </table>

      <!-- Botón copiar -->
      <button
        @click="copiarDatosPago"
        class="mt-3 px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition">
        Copiar datos
      </button>

      <!-- Mensaje de éxito (aparece 2 s) -->
      <small v-if="copiado" class="block mt-2 font-semibold text-green-600">
        ¡Datos copiados al portapapeles!
      </small>

      <!-- Instrucciones y contacto (fuera de la tabla) -->
      <p class="mt-4 text-xs italic">
        Una vez realizada la transferencia, envíe el comprobante y sus datos de facturación a
        <a href="mailto:Nataliainfomap@gmail.com" class="underline">Nataliainfomap@gmail.com</a> o al WhatsApp
        <a href="https://wa.me/56930689517" class="underline">+56 9 3068 9517</a>. La inscripción quedará confirmada tras la verificación del pago.
      </p>
    </Modal>
    <div class="md:col-span-2">
      <!-- Imagen del taller -->
      <h1 class="text-3xl md:text-4xl font-bold mb-2 text-accent">{{ workshop.workshop_name }}</h1>
      <div class="mb-4">
        <span class="block text-lg font-semibold px-2 border-t-2 border-b-2 border-accent py-1">
          {{ workshop.fecha_inicio }} al {{ workshop.fecha_termino }}
        </span>
      </div>
    </div>
    <div>
      <img :src="workshop.foto_taller" alt="Foto del taller" class="rounded-xl shadow-lg w-full h-auto object-cover">
      <!-- ¿Qué aprenderás? -->
      <div class="mt-8">
        <h2 class="text-xl md:text-2xl font-bold mb-2 text-accent">¿Qué aprenderás?</h2>
        <p class="mb-2 text-light">{{ workshop.Descripcion }}</p>
      </div>
      <br>
      <ul class="text-sm space-y-2 mb-6 text-light">
        <li><span class="icon-calendar"></span> <strong>{{ workshop.fecha_inicio }}</strong> – <span>{{ workshop.fecha_termino }}</span></li>
        <li><span class="icon-laptop"></span> {{ workshop.modalidad }}</li>
        <li><span class="icon-book"></span> {{ workshop.materiales }}</li>
        <li v-if="workshop.certificado"><span class="icon-certificate"></span> {{ workshop.certificado }}</li>
        <li><span class="icon-payments"></span> ${{ workshop.cost }}</li>
      </ul>
    </div>
    <!-- Información -->
    <div>
      <div class="mb-8">
        <h3 class="text-2xl font-bold mb-4">Conoce a tu instructor</h3>
        <!-- Contenedor responsive con flexbox -->
        <div class="flex flex-col md:flex-row md:items-start gap-4">
          <!-- Foto circular, SIEMPRE cuadrada -->
          <div class="w-24 md:w-32 aspect-square overflow-hidden rounded-full shrink-0">
            <img
              :src="workshop.foto_instructor"
              alt="Foto del instructor"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Descripción -->
          <p class="text-light">{{ workshop.descripcion_instructor }}</p>
        </div>
      </div>
      <!-- Puedes agregar botones de acción aquí si tu API entrega links -->
      <div class="space-y-4">
          <a :href="workshop.temario" target="_blank" class="block w-full text-center py-3 rounded-lg transition font-semibold" style="border: 1.5px solid rgb(59, 167, 227); color: rgb(59, 167, 227); background: transparent;" onmouseover="this.style.backgroundColor='rgb(59,167,227)';this.style.color='white'" onmouseout="this.style.backgroundColor='transparent';this.style.color='rgb(59,167,227)'">
              Descargar Temario
          </a>
          <small class="mt-2 block">PAGO:</small>
          <a :href="workshop.payment" target="_blank" class="block w-full text-center py-3 rounded-lg font-bold transition text-white" style="background-color: rgb(59, 167, 227); opacity: 1;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              Boleta
          </a>
          <button @click="inscripcionEmpresa=true" target="_blank" class="cursor-pointer block w-full text-center py-3 rounded-lg font-bold transition text-white" style="background-color: rgb(59, 167, 227); opacity: 1;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              Factura
          </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workshop: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      inscripcionEmpresa: false,
      copiado: false
    }
  },
  methods: {
    copiarDatosPago() {
      /* texto plano que se enviará al portapapeles */
      const datos = [
        'Nombre: INGENIERÍA MYZ',
        'RUT: 77.430.473-8',
        'Método de pago: Mercado Pago',
        'Tipo de cuenta: Cuenta Vista',
        'N.º de cuenta: 1014075600',
        'Enviar comprobante: Nataliainfomap@gmail.com / +56 9 3068 9517'
      ].join('\n');

      /* API moderna (con fallback) */
      const copiar = async () => {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(datos);
          } else {
            /* Fallback para navegadores sin Clipboard API */
            const ta = document.createElement('textarea');
            ta.value = datos;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          /* Mostrar aviso */
          this.copiado = true;
          setTimeout(() => (this.copiado = false), 2000);
        } catch (e) {
          console.error('No se pudo copiar:', e);
          alert('No se pudo copiar el texto. Copia manualmente, por favor.');
        }
      };

      copiar();
    },
  },
}
</script>