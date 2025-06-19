import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

const ReplyForm = () => {
  const [message, setMessage] = useState('');

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-semibold text-blue-900 mb-3">Répondre au sujet</h3>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
        placeholder="Votre message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex justify-end mt-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Send className="w-4 h-4 mr-2" />
          Publier
        </button>
      </div>
    </motion.div>
  );
};
export {ReplyForm}
