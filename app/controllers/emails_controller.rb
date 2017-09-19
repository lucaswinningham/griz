class EmailsController < ApplicationController
  # POST request to /emails
  def send_email
    email_params
    ContactMailer.contact_email(params[:email][:message]).deliver
    head :no_content
  end
  
  private
    def email_params
      params.require(:email).permit(:message)
    end
end
