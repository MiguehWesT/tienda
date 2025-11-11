import React from 'react';

const AboutPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Nosotros</h1>
        <div className="about-content">
          <section>
            <h2>Nuestra historia</h2>
            <p>En MTech, nacimos con una sola pasión: el gaming. Somos un equipo de entusiastas de la tecnología y los videojuegos que decidió transformar su amor por el hardware en una experiencia única para la comunidad gamer.
                Desde nuestros inicios, nos propusimos ofrecer productos de alto rendimiento, asesoría personalizada y un servicio cercano y confiable, construyendo una tienda donde cada jugador —desde el principiante hasta el profesional— pueda encontrar exactamente lo que necesita para llevar su experiencia al siguiente nivel.</p>
          </section>
          <section>
            <h2>Nuestra misión</h2>
            <p>Nuestra misión es potenciar el rendimiento y la experiencia de cada gamer, brindando componentes y periféricos de calidad, seleccionados cuidadosamente por expertos.
                Buscamos ser más que una tienda: queremos ser el punto de encuentro entre la tecnología, el rendimiento y la pasión por el juego, acompañando a nuestros clientes en cada actualización, cada partida y cada logro.</p>
          </section>
          <section>
            <h2>Nuestros valores</h2>
            <ul>
              <li>Calidad garantizada en todos nuestros productos</li>
              <li>Transparencia en precios y políticas</li>
              <li>Compromiso con la satisfacción del cliente</li>
              <li>Innovación constante</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;