import InputError from "@/components/input-error";
import { Suject } from "@/types";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FormEventHandler, } from "react";
interface form {
    post: string

    [key: string]: string | number
}

const ReplyForm = ({ forum }: {forum:Suject}) => {

    const { data, setData, post, processing, errors, reset } = useForm<form>({
        post: ''
    });
     const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
          post(route("forum.post.create",forum.id), {
            preserveScroll:true,
            onFinish: () => {

                reset();

              },
          });
        };
    return (
        <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 className="font-semibold text-blue-900 mb-3">Répondre au sujet</h3>
           <form onSubmit={handleSubmit} method="post">
             <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Votre message..."
                value={data.post}
                onChange={(e) => setData('post', e.target.value)}
            />
             <InputError message={errors.post} className="mt-2" />
            <div className="flex justify-end mt-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    {processing ? "Publication..." : "Publier"}
                </button>
            </div>
           </form>
        </motion.div>
    );
};
export { ReplyForm }
