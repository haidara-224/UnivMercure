import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
interface form {
    matricule: string,


    [key: string]: string | number
}
interface messageFlash {
    flash: {
        error: string
    }
}
export default function Page({ flash }: messageFlash) {
    const { data, setData, post, processing, errors, reset } = useForm<form>({
          matricule: '',

        });
        const [message,setMessage]=useState('')
        useEffect(() => {
            if (flash?.error) {
                setMessage(flash.error)
            }
        }, [flash]);
        const handleSubmit: FormEventHandler = (e) => {
              e.preventDefault();
              post(route("verifcation.store"), {
                onFinish: () => {
                    reset();

                  },
              });
            };
    return <>
        <Head title="Verification Matricule"/>

        <div className="flex flex-col justify-center items-center w-full h-screen">
           <p className="text-xl text-red-600">{message}</p>
            <form method="post" className=" w-1/2 space-y-4 bg-white p-8 shadow-2xl" onSubmit={handleSubmit}>
                <Input type="text"
                 value={data.matricule}
                 onChange={(e) => setData("matricule", e.target.value)}
                 placeholder="Entrer votre Matricule"
                  />
                  <InputError message={errors.matricule} className="mt-2" />
                <Button type="submit" disabled={processing}>
                {processing ? "Verification..." : "Verifier"}
                </Button>
            </form>
        </div>

    </>
}
