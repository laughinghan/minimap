require 'sinatra'
require 'erubis'
require 'open-uri'
require 'nokogiri'

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

def get_or_post(path, opts={}, &block)
  get(path, opts, &block)
  post(path, opts, &block)
end

get_or_post '/proxy' do
  address = URI.unescape(request.query_string)
  if address[0..6] != 'http://'
    address = 'http://' + address
  end
  base_address = address.split('/')[0..2].join('/')
  doc = Nokogiri::HTML(open(address))
  elements = doc.css('*')
  def absolutify(element, attribute, address)
    at = element[attribute]
    if at != nil && at[0] == '/'
      element[attribute] = address + at
    end
  end
  elements.each do |element|
    absolutify(element,'href',base_address)
    absolutify(element,'src',base_address)
    absolutify(element,'action',base_address)
  end
  doc.css('a').each do |link|
    if link['href'] != nil
      link['href'] = '/proxy?' + URI.escape(link['href'])
    end
  end
  doc.css('form').each do |form|
    if form['action'] != nil
      form['action'] = '/proxy?' + URI.escape(form['action'])
    end
  end
  doc.to_s.gsub('url(/', 'url(' + address + '/')
end