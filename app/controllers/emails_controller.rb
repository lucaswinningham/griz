class EmailsController < ApplicationController
  # POST request to /emails
  def send_email
    email_params
    @address = params[:email][:address]
    @message = params[:email][:message]
    ContactMailer.contact_email(@address, @message).deliver
    head :no_content
  end
  
  private
    def email_params
      params.require(:email).permit(:address, :message)
    end
end
