"use client"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            ⚠️ Isenção de Responsabilidade
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-medium">Aviso Importante:</p>
            <p>
              Todas as informações disponibilizadas neste site, incluindo páginas
              vinculadas, aplicativos associados, fóruns, blogs, contas em redes
              sociais e outras plataformas digitais ("Website"), são fornecidas
              exclusivamente para fins informativos. Os conteúdos apresentados são
              baseados em fontes de terceiros consideradas confiáveis, porém não
              garantimos sua exatidão, integridade ou atualidade.
            </p>
            <p>
              Nada do que é publicado neste website constitui aconselhamento
              financeiro, jurídico ou profissional de qualquer natureza, nem deve
              ser interpretado como tal. Qualquer decisão tomada com base nas
              informações aqui contidas é de inteira responsabilidade do usuário.
            </p>
            <p>
              Recomendamos fortemente que você realize sua própria pesquisa,
              análise e verificação independente antes de tomar qualquer decisão
              com base em nossos conteúdos. Operações com criptoativos, câmbio e
              investimentos envolvem riscos elevados e podem resultar em perdas
              significativas. Consulte um consultor financeiro qualificado antes de
              realizar qualquer investimento.
            </p>
            <p>
              Este site não constitui uma oferta, solicitação ou recomendação de
              compra ou venda de qualquer ativo.
            </p>
          </div>
          <div className="text-sm text-center pt-8 text-muted-foreground">
            © 2025 CriptoFinance. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
} 