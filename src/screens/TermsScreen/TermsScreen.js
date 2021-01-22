import React from 'react';
import '../../styles/HelperStyles.css';
import './PolicyScreen.css';
import Header1 from '../../components/Header/Header1';
import Footer from '../../components/Footer/Footer';
import { Animated } from 'react-animated-css';

function PolicyScreen() {
  return (
    <div className="policy-screen">
        <Header1 />
        <div id="policy-section">
          <div className="mw1100 flexColumn">
            <Animated isVisible={true} animationIn="slideInUp">
              <div className="flexColumn flexAlignCenter flexCenter mh-20 about-header">
                  <h1 className="policyhead">Terms and Conditions</h1>
              </div>
            </Animated>
            <Animated isVisible={true} animationIn="slideInUp">
              <div className="flexColumn policy-section">
                <div className="flexRow flexAround flexAlignCenter dividerBottom pb-100">
                    <p className="policy-text">
                        This chapter informs you of our policies regarding the collection, use, and disclosure of the Personal Data we receive from users of Tabber, in accordance with the laws of India regarding the data protection.
                        <br />By using Tabber, you agree to the collection and use of information in agreement with this policy.
                        <br />Tabber acts as a data controller.
                        <br />1. What personal data does Tabber use?
                        <br />When you sign up/register as a Tabber user, you provide us with your basic information, as well as any other data you want to be included in your resume, cover letter and/or online portfolio or data that might help Tabber to provide you assistance in your job seeking & career development. Furthermore, if you wish to use the Tabber premium features, we might also ask for payment details.

                        <br />The mandatory personal data to create an account includes your first and last name, e-mail address, and password. You are required to provide data which is necessary to create a personal account and use Tabber. Your refusal to provide this data determines that you cannot use Tabber.

                        <br />We recommend that you keep your account data updated at all times.

                        <br />Like many web/app/software applications operators, we also collect information that your browser sends whenever you visit Tabber. This Log Data may include information such as your computer's Internet Protocol („IP”) address, your location (city, country), browser type, browser version, and the pages of Tabber that you visit, the time and date of your visit, the time spent on those pages and other statistics (hereinafter Personal Data).

                        <br />2. How does Tabber use your personal data?
                       <br /> We use your Personal Data only for purposes related to Tabber, as following:

                        <br />Operate Tabber and provide you the best services described on Tabber, like to verify your identity when you sign in, autocomplete the templates with the information that you provided.

                        <br />To customize Tabber services and provide you a personalized experience and advertisements that will relate only to our services & products may appear on Tabber.

                        <br />Update you with operational news and information about Tabber, e.g., to notify you about changes, upgrades or security updates.

                        <br />Provide you with information that you request from Tabber or, and with marketing information about products and services which may interest/benefit you for your job searching and career.

                        <br />Send you relevant and informational content that might interest or inspire you in order to help you at all the stages of your career.

                        <br />Carry out technical analysis to determine how to improve the services Tabber provides.

                        <br />Monitor activity on Tabber, like to identify potentially fraudulent activity and to ensure compliance with the user terms that apply to Tabber.

                        <br />Manage our relationship with you, like by responding to your comments or queries submitted to us on Tabber or asking for your feedback or whether you want to participate in a survey.

                        <br />Manage our legal and operational affairs.

                        <br />Provide general administrative and perform functions and activities.

                        <br />Management of our CRM tools to provide a better, efficient and personalized communication & experience related to Tabber's products and services.

                        <br />While ensuring the safety of your data, Tabber may link the personal data we have collected about you through the multiple channels: the use of our website/apps, newsletter subscription, name, email, city, country and information using cookies from 3rd parties (data from 3rd parties does not contain information about you as an individual, but the overall audience) concerning your interests, demographics, preferences (e.g.: age group, academic background, job preferences.). The purpose for this is to perform general marketing research including customer analysis and customer segmentation and statistics. Furthermore, we may use the information to evaluate and assess your interests and preferences in order to personalize your job seeking/career orientation and website/apps experiences and optimizing the service you receive from Tabber.

                        <br />If you have signed up to receive Newsletters, then Tabber will also use your personal data in order to adapt the content of Newsletters to better suit your interests and to provide you with personalized offerings.

                        <br />Analyze your profile picture in order to give suggestions as to how you may optimize your profile picture.

                        <br />Tabber may utilize third-party service providers that will store & have access to and process your personal data. If such third party services providers process & control your data outside of the EU, such transfer of personal data will be subject to the European Commission’s standard contractual clauses. When utilizing our services within EU, we minimize the transfer of data as much as possible outside EU, for example, we try to use as much as possible the cloud infrastructure within EU, but some emails, payments process, etc. might also be conducted in accordance with the European Commission’s standard contractual clauses.

                        <br />If you are using Tabber services outside the EU-U.S. or the European Commission’s standard contractual clauses, for better performance and experience of our products and services, with your explicit and separate consent from this privacy policy, we might temporarily store your data and deliver content & services that support Tabber through cloud servers located outside EU/EEA or US.

                        <br />3. How long does Tabber keep your data?
                        <br />The data and information that identify you as an individual will be kept on our servers as long as they are needed, but no longer than 6 years since the last usage of Tabber. E.g.: you might want after a couple of months or years to Sign In to your account to update your job application when looking for a new job.
                        <br />4. What authorizes Tabber to process the data as a data controller?
                        <br />Tabber has the following lawful bases to process personal data:

                        <br />Execution of the agreement

                        <br />The legal basis for processing the personal data of the interested party which is collected is the execution of the service agreement. In this regard, the interested party is obliged to provide that data necessary for its execution. If we are not provided with this data, our services can’t be performed.

                        <br />Legal obligations

                        <br />The sending of feedback questionnaires about the services, results which will be used to know users' opinion and how the services can be improved.

                      Occasionally Tabber might make changes to the Privacy Policy. When such changes are made, Tabber will make sure to provide you with prominent notice as appropriate under the circumstances, e.g., by displaying a prominent notice within Tabber or by sending you an email. In some cases, we will notify you in advance. Please, therefore, make sure you read any such notice carefully.
                    </p>
                </div>
              </div>
            </Animated>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default PolicyScreen;
