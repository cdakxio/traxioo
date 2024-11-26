export default function Legal() {
  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-8">Mentions Légales</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">1. Informations légales</h2>
              <p className="text-gray-400 mb-4">
                Le site Experio.ia est édité par la société Experio SAS, société par actions simplifiée au capital de 10 000 euros,
                immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro XXX XXX XXX.
              </p>
              <p className="text-gray-400 mb-4">
                Siège social : 123 Avenue de l'Innovation, 75001 Paris, France<br />
                Numéro de TVA intracommunautaire : FR XX XXX XXX XXX<br />
                Directeur de la publication : [Nom du directeur]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">2. Hébergement</h2>
              <p className="text-gray-400 mb-4">
                Le site est hébergé par [Nom de l'hébergeur], [Adresse de l'hébergeur]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">3. Propriété intellectuelle</h2>
              <p className="text-gray-400 mb-4">
                L'ensemble du contenu du site Experio.ia (textes, images, vidéos, etc.) est protégé par le droit d'auteur.
                Toute reproduction ou représentation totale ou partielle de ce site par quelque procédé que ce soit,
                sans l'autorisation expresse de l'exploitant du site Internet, est interdite et constituerait une contrefaçon.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">4. Protection des données personnelles</h2>
              <p className="text-gray-400 mb-4">
                Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné à [finalité du traitement].
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès,
                de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">5. Cookies</h2>
              <p className="text-gray-400 mb-4">
                Le site Experio.ia utilise des cookies pour améliorer l'expérience utilisateur. En navigant sur ce site,
                vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">6. Limitation de responsabilité</h2>
              <p className="text-gray-400 mb-4">
                Experio.ia s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.
                Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition
                sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">7. Droit applicable</h2>
              <p className="text-gray-400">
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français
                seront seuls compétents.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}