
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { getLanguage, type Language } from "@/lib/storage";

const lastUpdatedDate = "July 26, 2024";

const uiTexts = {
    title: { en: 'Terms of Service', fr: 'Conditions d\'Utilisation', de: 'Nutzungsbedingungen', it: 'Termini di Servizio', es: 'Términos de Servicio' },
    download: { en: 'Download', fr: 'Télécharger', de: 'Herunterladen', it: 'Scarica', es: 'Descargar' },
    lastUpdated: { en: 'Last updated:', fr: 'Dernière mise à jour :', de: 'Zuletzt aktualisiert:', it: 'Ultimo aggiornamento:', es: 'Última actualización:' },
    back: { en: 'Back to About', fr: 'Retour à À propos', de: 'Zurück zu Über', it: 'Torna a Informazioni', es: 'Volver a Acerca de' },
    h1: { en: '1. Introduction', fr: '1. Introduction', de: '1. Einleitung', it: '1. Introduzione', es: '1. Introducción' },
    p1: { 
        en: 'Welcome to LinguaLearn ("the Application"). This application is designed to help you learn and practice languages through interactive quizzes. By using our Application, you agree to be bound by these Terms of Service ("Terms").',
        fr: 'Bienvenue sur LinguaLearn ("l\'Application"). Cette application est conçue pour vous aider à apprendre et à pratiquer les langues grâce à des quiz interactifs. En utilisant notre Application, vous acceptez d\'être lié par ces Conditions d\'Utilisation ("Conditions").',
        de: 'Willkommen bei LinguaLearn ("die Anwendung"). Diese Anwendung soll Ihnen helfen, Sprachen durch interaktive Quizze zu lernen und zu üben. Durch die Nutzung unserer Anwendung erklären Sie sich mit diesen Nutzungsbedingungen ("Bedingungen") einverstanden.',
        it: 'Benvenuto in LinguaLearn ("l\'Applicazione"). Questa applicazione è progettata per aiutarti a imparare e praticare le lingue attraverso quiz interattivi. Utilizzando la nostra Applicazione, accetti di essere vincolato da questi Termini di Servizio ("Termini").',
        es: 'Bienvenido a LinguaLearn ("la Aplicación"). Esta aplicación está diseñada para ayudarte a aprender y practicar idiomas a través de cuestionarios interactivos. Al utilizar nuestra Aplicación, aceptas estar sujeto a estos Términos de Servicio ("Términos").'
    },
    h2: { en: '2. Cost and Use of Service', fr: '2. Coût et Utilisation du Service', de: '2. Kosten und Nutzung des Dienstes', it: '2. Costo e Utilizzo del Servizio', es: '2. Costo y Uso del Servicio' },
    p2: {
        en: 'LinguaLearn is provided completely free of charge. There are no subscriptions, hidden costs, or microtransactions. The Application is intended for your personal, private, and non-commercial use only. You agree not to use the Application for any business, corporate, for-profit, or unlawful purposes.',
        fr: 'LinguaLearn est fourni entièrement gratuitement. Il n\'y a pas d\'abonnements, de coûts cachés ou de microtransactions. L\'Application est destinée à votre usage personnel, privé et non commercial uniquement. Vous vous engagez à ne pas utiliser l\'Application à des fins commerciales, corporatives, lucratives ou illégales.',
        de: 'LinguaLearn wird vollständig kostenlos zur Verfügung gestellt. Es gibt keine Abonnements, versteckten Kosten oder Mikrotransaktionen. Die Anwendung ist nur für Ihren persönlichen, privaten und nicht-kommerziellen Gebrauch bestimmt. Sie stimmen zu, die Anwendung nicht für geschäftliche, unternehmerische, gewinnorientierte oder rechtswidrige Zwecke zu verwenden.',
        it: 'LinguaLearn è fornito in modo completamente gratuito. Non ci sono abbonamenti, costi nascosti o microtransazioni. L\'Applicazione è destinata esclusivamente al tuo uso personale, privato e non commerciale. Accetti di non utilizzare l\'Applicazione per scopi commerciali, aziendali, a scopo di lucro o illegali.',
        es: 'LinguaLearn se proporciona de forma totalmente gratuita. No hay suscripciones, costos ocultos ni microtransacciones. La Aplicación está destinada únicamente para tu uso personal, privado y no comercial. Aceptas no utilizar la Aplicación para fines comerciales, corporativos, con fines de lucro o ilegales.'
    },
    h3: { en: '3. Data Privacy and Storage', fr: '3. Confidentialité et Stockage des Données', de: '3. Datenschutz und Datenspeicherung', it: '3. Privacy e Archiviazione dei Dati', es: '3. Privacidad y Almacenamiento de Datos' },
    p3: {
        en: 'We take your privacy seriously. LinguaLearn is designed to be a fully client-side application. This means:',
        fr: 'Nous prenons votre vie privée au sérieux. LinguaLearn est conçue pour être une application entièrement côté client. Cela signifie que :',
        de: 'Wir nehmen Ihre Privatsphäre ernst. LinguaLearn ist als vollständig clientseitige Anwendung konzipiert. Das bedeutet:',
        it: 'Prendiamo sul serio la tua privacy. LinguaLearn è progettata per essere un\'applicazione interamente lato client. Ciò significa:',
        es: 'Nos tomamos tu privacidad en serio. LinguaLearn está diseñada para ser una aplicación completamente del lado del cliente. Esto significa:'
    },
    li3_1: {
        en: 'The Application does not collect any personal data from its users.',
        fr: 'L\'Application ne collecte aucune donnée personnelle de ses utilisateurs.',
        de: 'Die Anwendung sammelt keine personenbezogenen Daten von ihren Nutzern.',
        it: 'L\'Applicazione non raccoglie alcun dato personale dai suoi utenti.',
        es: 'La Aplicación no recopila ningún dato personal de sus usuarios.'
    },
    li3_2: {
        en: 'All usage data, which includes your quiz statistics, error history, and application settings, is stored exclusively on your local device.',
        fr: 'Toutes les données d\'utilisation, qui incluent vos statistiques de quiz, votre historique d\'erreurs et les paramètres de l\'application, sont stockées exclusivement sur votre appareil local.',
        de: 'Alle Nutzungsdaten, einschließlich Ihrer Quiz-Statistiken, Fehlerhistorie und Anwendungseinstellungen, werden ausschließlich auf Ihrem lokalen Gerät gespeichert.',
        it: 'Tutti i dati di utilizzo, che includono le statistiche dei quiz, la cronologia degli errori e le impostazioni dell\'applicazione, sono archiviati esclusivamente sul tuo dispositivo locale.',
        es: 'Todos los datos de uso, que incluyen tus estadísticas de cuestionarios, historial de errores y configuración de la aplicación, se almacenan exclusivamente en tu dispositivo local.'
    },
    li3_3: {
        en: 'We do not collect, store, or transmit any of your data to any external servers. You have full control over your data and can clear it at any time from within the Application.',
        fr: 'Nous ne collectons, ne stockons ni ne transmettons aucune de vos données à des serveurs externes. Vous avez le contrôle total sur vos données et pouvez les effacer à tout moment depuis l\'Application.',
        de: 'Wir sammeln, speichern oder übertragen keine Ihrer Daten an externe Server. Sie haben die volle Kontrolle über Ihre Daten und können sie jederzeit innerhalb der Anwendung löschen.',
        it: 'Non raccogliamo, archiviamo o trasmettiamo nessuno dei tuoi dati a server esterni. Hai il pieno controllo sui tuoi dati e puoi cancellarli in qualsiasi momento dall\'interno dell\'Applicazione.',
        es: 'No recopilamos, almacenamos ni transmitimos ninguno de tus datos a servidores externos. Tienes control total sobre tus datos y puedes borrarlos en cualquier momento desde la Aplicación.'
    },
    h4: { en: '4. Intellectual Property', fr: '4. Propriété Intellectuelle', de: '4. Geistiges Eigentum', it: '4. Proprietà Intellettuale', es: '4. Propiedad Intelectual' },
    p4: {
        en: 'The Application, including its design, logo, user interface, and underlying code, is the exclusive property of',
        fr: 'L\'Application, y compris sa conception, son logo, son interface utilisateur et son code sous-jacent, est la propriété exclusive de',
        de: 'Die Anwendung, einschließlich ihres Designs, Logos, ihrer Benutzeroberfläche und des zugrunde liegenden Codes, ist das ausschließliche Eigentum von',
        it: 'L\'Applicazione, inclusi il suo design, logo, interfaccia utente e codice sottostante, è di proprietà esclusiva di',
        es: 'La Aplicación, incluyendo su diseño, logo, interfaz de usuario y código subyacente, es propiedad exclusiva de'
    },
    h5: { en: '5. Disclaimer of Warranties', fr: '5. Exclusion de Garanties', de: '5. Gewährleistungsausschluss', it: '5. Esclusione di Garanzie', es: '5. Exclusión de Garantías' },
    p5: {
        en: 'The Application is provided "as is" and "as available". We do not warrant that the Application will be error-free or uninterrupted. The creator is not responsible for any errors that may appear while using the application, including any factual or content-related inaccuracies in the quizzes. You use the Application at your own risk.',
        fr: 'L\'Application est fournie "telle quelle" et "selon la disponibilité". Nous ne garantissons pas que l\'Application sera exempte d\'erreurs ou ininterrompue. Le créateur n\'est pas responsable des erreurs qui pourraient apparaître lors de l\'utilisation de l\'application, y compris les inexactitudes factuelles ou de contenu dans les quiz. Vous utilisez l\'Application à vos propres risques.',
        de: 'Die Anwendung wird "wie besehen" und "wie verfügbar" bereitgestellt. Wir garantieren nicht, dass die Anwendung fehlerfrei oder ununterbrochen ist. Der Ersteller ist nicht verantwortlich für Fehler, die bei der Nutzung der Anwendung auftreten können, einschließlich sachlicher oder inhaltlicher Ungenauigkeiten in den Quizzen. Sie nutzen die Anwendung auf eigenes Risiko.',
        it: 'L\'Applicazione è fornita "così com\'è" e "come disponibile". Non garantiamo che l\'Applicazione sarà priva di errori o ininterrotta. Il creatore non è responsabile per eventuali errori che potrebbero apparire durante l\'utilizzo dell\'applicazione, incluse eventuali inesattezze fattuali o di contenuto nei quiz. Utilizzi l\'Applicazione a tuo rischio.',
        es: 'La Aplicación se proporciona "tal cual" y "según disponibilidad". No garantizamos que la Aplicación esté libre de errores o sea ininterrumpida. El creador no es responsable de los errores que puedan aparecer al usar la aplicación, incluidas las inexactitudes fácticas o de contenido en los cuestionarios. Utilizas la Aplicación bajo tu propio riesgo.'
    },
    h6: { en: '6. Limitation of Liability', fr: '6. Limitation de Responsabilité', de: '6. Haftungsbeschränkung', it: '6. Limitazione di Responsabilità', es: '6. Limitación de Responsabilidad' },
    p6: {
        en: 'To the fullest extent permitted by applicable law,',
        fr: 'Dans toute la mesure permise par la loi applicable,',
        de: 'Soweit nach geltendem Recht zulässig, haftet',
        it: 'Nella misura massima consentita dalla legge applicabile,',
        es: 'En la máxima medida permitida por la ley aplicable,'
    },
    p6_end: {
        en: 'shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Application.',
        fr: 'ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation de l\'Application.',
        de: 'nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die sich aus Ihrer Nutzung der Anwendung ergeben.',
        it: 'non sarà responsabile per eventuali danni indiretti, incidentali, speciali, consequenziali o punitivi derivanti dal tuo uso dell\'Applicazione.',
        es: 'no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo que resulte de tu uso de la Aplicación.'
    },
    h7: { en: '7. Changes to Terms', fr: '7. Modifications des Conditions', de: '7. Änderungen der Bedingungen', it: '7. Modifiche ai Termini', es: '7. Cambios en los Términos' },
    p7: {
        en: 'We reserve the right to modify these Terms at any time. The "Last updated" date at the top of these Terms will indicate the latest revision. By continuing to use the Application after changes become effective, you agree to be bound by the revised Terms.',
        fr: 'Nous nous réservons le droit de modifier ces Conditions à tout moment. La date de "Dernière mise à jour" en haut de ces Conditions indiquera la dernière révision. En continuant à utiliser l\'Application après l\'entrée en vigueur des modifications, vous acceptez d\'être lié par les Conditions révisées.',
        de: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Das Datum "Zuletzt aktualisiert" oben in diesen Bedingungen gibt die letzte Überarbeitung an. Indem Sie die Anwendung nach Inkrafttreten der Änderungen weiter nutzen, erklären Sie sich mit den überarbeiteten Bedingungen einverstanden.',
        it: 'Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. La data di "Ultimo aggiornamento" in cima a questi Termini indicherà l\'ultima revisione. Continuando a utilizzare l\'Applicazione dopo l\'entrata in vigore delle modifiche, accetti di essere vincolato dai Termini rivisti.',
        es: 'Nos reservamos el derecho de modificar estos Términos en cualquier momento. La fecha de "Última actualización" en la parte superior de estos Términos indicará la última revisión. Al continuar utilizando la Aplicación después de que los cambios entren en vigencia, aceptas estar sujeto a los Términos revisados.'
    },
    h8: { en: '8. Contact Information', fr: '8. Coordonnées', de: '8. Kontaktinformationen', it: '8. Informazioni di Contatto', es: '8. Información de Contacto' },
    p8: {
        en: 'If you have any questions about these Terms, please contact us at',
        fr: 'Si vous avez des questions sur ces Conditions, veuillez nous contacter à',
        de: 'Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte unter',
        it: 'Se hai domande su questi Termini, ti preghiamo di contattarci a',
        es: 'Si tienes alguna pregunta sobre estos Términos, por favor contáctanos en'
    }
};

export default function TermsPage() {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(getLanguage());
        };
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);
        return () => {
            window.removeEventListener('language-changed', handleLanguageChange);
        };
    }, []);

    const getUIText = (key: keyof typeof uiTexts) => {
        return uiTexts[key][language] || uiTexts[key]['en'];
    };

    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="items-center text-center">
                <CardTitle className="text-3xl">{getUIText('title')}</CardTitle>
                <div className="pt-2">
                    <a href="/terms_of_service.pdf" download="LinguaLearn_Terms_of_Service.pdf">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            {getUIText('download')}
                        </Button>
                    </a>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 text-sm max-h-[60vh] overflow-y-auto p-6">
                <p className="text-muted-foreground text-center -mt-4">{getUIText('lastUpdated')} {lastUpdatedDate}</p>

                <h3 className="text-lg font-semibold">{getUIText('h1')}</h3>
                <p>{getUIText('p1')}</p>

                <h3 className="text-lg font-semibold">{getUIText('h2')}</h3>
                <p>{getUIText('p2')}</p>

                <h3 className="text-lg font-semibold">{getUIText('h3')}</h3>
                <p>{getUIText('p3')}</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>{getUIText('li3_1')}</li>
                    <li>{getUIText('li3_2')}</li>
                    <li>{getUIText('li3_3')}</li>
                </ul>

                <h3 className="text-lg font-semibold">{getUIText('h4')}</h3>
                <p>
                    {getUIText('p4')} <span className="font-semibold">Kuljo Apps (Damian Kuliś)</span>.
                </p>

                <h3 className="text-lg font-semibold">{getUIText('h5')}</h3>
                <p>{getUIText('p5')}</p>

                <h3 className="text-lg font-semibold">{getUIText('h6')}</h3>
                <p>
                    {getUIText('p6')} <span className="font-semibold">Kuljo Apps (Damian Kuliś)</span> {getUIText('p6_end')}
                </p>

                <h3 className="text-lg font-semibold">{getUIText('h7')}</h3>
                <p>{getUIText('p7')}</p>

                <h3 className="text-lg font-semibold">{getUIText('h8')}</h3>
                <p>
                    {getUIText('p8')} <a href="mailto:kuljo.apps@gmail.com" className="text-primary underline hover:text-primary/80">kuljo.apps@gmail.com</a>.
                </p>

            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href="/settings/about" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('back')}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

