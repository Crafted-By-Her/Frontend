import { ShieldCheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Footer from '../Components/Footer';

const TermsAndConditions = () => {
  return (
    <>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <ShieldCheckIcon className="h-12 w-12 text-orange-500" />
        </div>
        <h1 className="text-4xl font-bold text-orange-600 mb-2">Terms & Conditions</h1>
        <p className="text-lg text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            Welcome to CraftedByHer, a platform dedicated to empowering women artisans by providing them with 
            opportunities to sell their handmade products. These Terms govern your use of our website and services.
          </p>
          <p className="text-gray-700">
            By accessing or using our platform, you agree to be bound by these Terms. If you disagree, please 
            refrain from using our services.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Artisan Responsibilities</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <InformationCircleIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>You must be a woman artisan aged 18+ to sell on our platform.</span>
            </li>
            <li className="flex items-start">
              <InformationCircleIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>All products must be handmade by you or your women-led cooperative.</span>
            </li>
            <li className="flex items-start">
              <InformationCircleIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>You are responsible for accurate product descriptions and fulfillment timelines.</span>
            </li>
            <li className="flex items-start">
              <InformationCircleIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Prohibited items include mass-produced goods, weapons, or any illegal products.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Buyer Responsibilities</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <InformationCircleIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>You must provide accurate shipping information and payment details.</span>
            </li>
            <li className="flex items-start">
              <InformationCircleIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Understand that handmade items may have slight variations from product images.</span>
            </li>
            <li className="flex items-start">
              <InformationCircleIcon className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Review return policies for each artisan before purchasing.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Payments & Fees</h2>
          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <p className="text-orange-700 font-medium">
              We charge a 15% commission on sales to cover platform maintenance and artisan support programs.
            </p>
          </div>
          <p className="text-gray-700 mb-3">
            Artisans receive payment 7 days after order fulfillment, minus our commission. We use secure payment 
            processors to protect all transactions.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 mb-3">
            Artisans retain ownership of their designs and product images. By listing on CraftedByHer, you grant 
            us a license to display and promote your products.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Dispute Resolution</h2>
          <p className="text-gray-700 mb-3">
            We mediate disputes between buyers and artisans. Refunds may be issued at our discretion for 
            undelivered or significantly misrepresented items.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700">
            CraftedByHer is not liable for:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
            <li>Shipping delays or damages</li>
            <li>Product quality issues (beyond facilitating refunds)</li>
            <li>Any unauthorized account access due to compromised credentials</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms periodically. Continued use after changes constitutes acceptance.
          </p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-700 mb-2">Contact Us</h3>
          <p className="text-gray-700">
            For questions about these Terms, email <span className="text-orange-600">legal@craftedbyher.com</span>.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;