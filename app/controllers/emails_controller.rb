class EmailsController < ApplicationController
  # POST request to /emails
  def send_email
    p params[:message]
  end
  
  private
    def email_params
      params.require(:message).permit(:message)
    end
end