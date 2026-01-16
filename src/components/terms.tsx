import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function TermsPage() {
    const lastUpdatedDate = "July 26, 2024";

    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="items-center text-center">
                <CardTitle className="text-3xl">Terms of Service</CardTitle>
                <div className="pt-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" download>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                    </a>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 text-sm max-h-[60vh] overflow-y-auto p-6">
                <p className="text-muted-foreground text-center">Last updated: {lastUpdatedDate}</p>

                <h3 className="text-lg font-semibold">1. Introduction</h3>
                <p>
                    Welcome to LinguaLearn ("the Application"). This application is designed to help you learn and practice languages through interactive quizzes. By using our Application, you agree to be bound by these Terms of Service ("Terms").
                </p>

                <h3 className="text-lg font-semibold">2. Use of the Service</h3>
                <p>
                    LinguaLearn is provided for your personal, non-commercial use only. You agree not to use the Application for any unlawful purpose or in any way that might harm, disrupt, or impair the service.
                </p>

                <h3 className="text-lg font-semibold">3. Data Privacy and Storage</h3>
                <p>
                    We take your privacy seriously. LinguaLearn is designed to be a fully client-side application. This means:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>
                        All your data, including quiz statistics, error history, and application settings, is stored exclusively on your local device using your web browser's `localStorage` functionality.
                    </li>
                    <li>
                        We do not collect, store, or transmit any of your personal data or usage statistics to any external servers.
                    </li>
                    <li>
                        You have full control over your data. You can clear your statistics and error history at any time from within the Application.
                    </li>
                </ul>

                <h3 className="text-lg font-semibold">4. Intellectual Property</h3>
                <p>
                    The Application, including its design, logo, user interface, and underlying code, is the exclusive property of Kuljo Apps, Damian Kuliś. All rights are reserved. The quiz content is provided for educational purposes.
                </p>

                <h3 className="text-lg font-semibold">5. Disclaimer of Warranties</h3>
                <p>
                    The Application is provided "as is" and "as available" without any warranties of any kind, express or implied. We do not warrant that the Application will be error-free, uninterrupted, or that the translations and quiz content will be completely accurate. You use the Application at your own risk.
                </p>

                <h3 className="text-lg font-semibold">6. Limitation of Liability</h3>
                <p>
                    To the fullest extent permitted by applicable law, Kuljo Apps, Damian Kuliś shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Application.
                </p>

                <h3 className="text-lg font-semibold">7. Changes to Terms</h3>
                <p>
                    We reserve the right to modify these Terms at any time. The "Last updated" date at the top of these Terms will indicate the latest revision. By continuing to use the Application after changes become effective, you agree to be bound by the revised Terms.
                </p>

                <h3 className="text-lg font-semibold">8. Contact Information</h3>
                <p>
                    If you have any questions about these Terms, please contact us at <a href="mailto:kuljo.apps@gmail.com" className="text-primary underline hover:text-primary/80">kuljo.apps@gmail.com</a>.
                </p>

            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href="/settings/about" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to About
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
