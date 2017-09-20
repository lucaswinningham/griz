class ContactMailer < ActionMailer::Base
  if Rails.env.development?
    default from: ENV['gmail_username']
  elsif Rails.env.production?
    default from: ENV['SENDGRID_USERNAME']
  end
  
  def contact_email body
    @body = body
    mail(to: ENV['gmail_username'], subject: 'New Contact')
  end
end
