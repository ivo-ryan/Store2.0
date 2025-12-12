import { render, screen, fireEvent } from "@testing-library/react";
import FeatureProduct from "./index";
import { describe, it, expect } from "vitest";

describe("FeatureProduct Component", () => {
  const descricao = "Este é um ótimo produto.";
  const especificacoes = "Peso: 1kg";

  it("Renderiza a descrição inicialmente", () => {
    render(<FeatureProduct descricao={descricao} especificacoes={especificacoes} />);

    const descContent = screen.getByText(descricao).parentElement!;
    const especContent = screen.getByText(especificacoes).parentElement!;

    expect(descContent.className).toContain("show");
    expect(especContent.className).toContain("hide");
  });

  it("Troca para especificações ao clicar", () => {
    render(<FeatureProduct descricao={descricao} especificacoes={especificacoes} />);

    fireEvent.click(screen.getByText("Especificações"));

    const descContent = screen.getByText(descricao).parentElement!;
    const especContent = screen.getByText(especificacoes).parentElement!;

    expect(descContent.className).toContain("hide");
    expect(especContent.className).toContain("show");
  });

  it("Volta para a descrição ao clicar novamente", () => {
    render(<FeatureProduct descricao={descricao} especificacoes={especificacoes} />);

    fireEvent.click(screen.getByText("Especificações")); 
    fireEvent.click(screen.getByText("Descrição")); 

    const descContent = screen.getByText(descricao).parentElement!;
    const especContent = screen.getByText(especificacoes).parentElement!;

    expect(descContent.className).toContain("show");
    expect(especContent.className).toContain("hide");
  });
});
