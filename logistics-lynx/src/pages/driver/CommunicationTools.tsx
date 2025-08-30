import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  User, 
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'incoming' | 'outgoing';
  status: 'sent' | 'delivered' | 'read';
}

const CommunicationTools: React.FC = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Dispatch',
      content: 'How is the delivery going? Any issues?',
      timestamp: '2:30 PM',
      type: 'incoming',
      status: 'read'
    },
    {
      id: '2',
      sender: 'You',
      content: 'All good, should arrive on time',
      timestamp: '2:32 PM',
      type: 'outgoing',
      status: 'delivered'
    },
    {
      id: '3',
      sender: 'Dispatch',
      content: 'Great! Keep us updated if anything changes',
      timestamp: '2:35 PM',
      type: 'incoming',
      status: 'read'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Tools</h1>
          <p className="text-gray-600">Stay connected with dispatch and team</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Dispatch
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Call Dispatch</h3>
          <p className="text-sm text-gray-600 mb-4">Direct phone call to dispatch</p>
          <button className="btn-primary w-full">Call Now</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Send Update</h3>
          <p className="text-sm text-gray-600 mb-4">Quick status update to dispatch</p>
          <button className="btn-outline w-full">Send Update</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Report Issue</h3>
          <p className="text-sm text-gray-600 mb-4">Report problems or delays</p>
          <button className="btn-outline w-full">Report Issue</button>
        </div>
      </div>

      {/* Messages Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                message.type === 'outgoing' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{message.sender}</span>
                  <span className="text-xs opacity-75">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.content}</p>
                {message.type === 'outgoing' && (
                  <div className="flex items-center gap-1 mt-1">
                    {message.status === 'sent' && <CheckCircle className="w-3 h-3 opacity-75" />}
                    {message.status === 'delivered' && <CheckCircle className="w-3 h-3 opacity-75" />}
                    {message.status === 'read' && <CheckCircle className="w-3 h-3" />}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Send Message Form */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="btn-primary flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick Contacts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Dispatch</h4>
              <p className="text-sm text-gray-600">Main dispatch line</p>
            </div>
            <button className="ml-auto btn-outline text-sm">Call</button>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Emergency</h4>
              <p className="text-sm text-gray-600">24/7 emergency line</p>
            </div>
            <button className="ml-auto btn-outline text-sm">Call</button>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Fleet Manager</h4>
              <p className="text-sm text-gray-600">Fleet operations</p>
            </div>
            <button className="ml-auto btn-outline text-sm">Call</button>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Safety Team</h4>
              <p className="text-sm text-gray-600">Safety and compliance</p>
            </div>
            <button className="ml-auto btn-outline text-sm">Call</button>
          </div>
        </div>
      </div>

      {/* Status Updates */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Status Updates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">On Time</p>
            <p className="text-sm text-gray-600">Delivery on schedule</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">Delayed</p>
            <p className="text-sm text-gray-600">Running behind schedule</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">Issue</p>
            <p className="text-sm text-gray-600">Problem encountered</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">Custom</p>
            <p className="text-sm text-gray-600">Send custom message</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationTools;
