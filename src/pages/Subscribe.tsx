import { gql, useMutation } from "@apollo/client";
import { FormEvent, useCallback, useState } from "react";
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIBE_MUTATION = gql`
  mutation createSubscribe($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`

export function Subscribe() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { data, loading }] = useMutation<{ createSubscriber: { id: string } }>(CREATE_SUBSCRIBE_MUTATION)

  const _handleSubscribe = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    await createSubscriber({
      variables: {
        name, email
      }
    })

  }, [name, email])

  return (
    <div className={`
      min-h-screen bg-blur bg-cover bg-no-repeat
      flex flex-col items-center
    `}>
      <div className="w-full max-w-[1100px] flex gap-6 justify-between items-center mt-20 m-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form className="flex flex-col gap-2 w-full" onSubmit={ _handleSubscribe }>
            <input
              className="bg-gray-900 rounded px-5 h-14"
              onChange={({ target }) => setName(target.value)}
              type="text" placeholder="Digite seu nome" required
              />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              onChange={({ target }) => setEmail(target.value)}
              type="email" placeholder="Digite seu e-mail" required
            />
            <button type="submit" disabled={ loading }
              className={`
                mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors
                disabled:opacity-50
              `}
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code-muckup.png" className="mt-18" alt="" />
    </div>
  )
}