require 'sinatra'
require 'erubis'
require 'open-uri'

#templates are just in .
set :views, File.dirname(__FILE__)

get '/' do
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end

get '/dev' do
  @dev = true
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end

get '/proxy' do
  address = URI.unescape(request.query_string)
  if address[0..6] != 'http://'
    address = 'http://' + address
  end
  open(address)
end