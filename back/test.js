
function inicializa(){
  parent.gbl.seta_usr(parent.gbl.gbl_nome_razao, parent.gbl.gbl_nome_fantasia);

  parent.gbl.seta_tit("Nota Fiscal de Serviços Eletrônica - Geração");
  document.frm.txt_cnpj_cpf_tom.focus();

  document.frm.hdd_in_liminar_pre.value = parent.gbl.gbl_liminar;
  parent.gbl.seta_msg("");
  if (parent.gbl.gbl_ult_nfse < 30) alert("*** EM CASO DE ERRO, NÃO GERE UMA NOVA NOTA, SUBSTITUA! ***\n\nA Substituição pode ser feita pela Internet, antes de ter sido solicitado o fechamento, para qualquer alteração, exceto para mudar o local onde o imposto é devido (se estiver destinado a Goiânia), ou para alterar o CNPJ/CPF do Tomador.\n\nPortanto, sempre que possível, use a opção de substituição, que automaticamente anula uma nota, gerando outra correta.\nEvite gerar uma nova nota, o que implicará a solicitação de cancelamento da anterior por meio de um processo administrativo.\n\nPara maiores esclarecimentos, escolha Cancelamento de Nota Fiscal no menu da NFS-e.");
}
function limpa_tomador(n) {
  if (n==1) document.frm.txt_cnpj_cpf_tom.value = "";
  else {
    if (n==2) document.frm.txt_inscr_municipal_tom.value = "";
    else {
      document.frm.txt_cnpj_cpf_tom.value        = "";
      document.frm.txt_inscr_municipal_tom.value = "";
    }
  }
  with (document.frm) {
    txt_razao_nome_tom.value         = "";
    txt_razao_nome_tom.value         = "";
    txt_endereco_tom.value           = "";
    txt_numero_tom.value             = "";
    txt_complemento_tom.value        = "";
    txt_bairro_tom.value             = "";
    txt_cep_tom.value                = "";
    chk_tomador_fora_tom.checked     = false;
    txt_codg_municipio_tom.disabled  = false;
    txt_nome_municipio_tom.disabled  = false;
    txt_codg_municipio_tom.value     = "25300";
    txt_nome_municipio_tom.value     = "GOIÂNIA";
    txt_uf_tom.value                 = "GO";
    hdd_in_substituto_trib_tom.value = "0";
    hdd_in_retido_not.value          = "0";
    txt_cnpj_cpf_tom.focus();
  }
  parent.gbl.seta_msg("");
}
function consultar_tomador_cnpjcpf() {
  if (document.frm.txt_cnpj_cpf_tom.value == "") {
    alert("Informe o CNPJ ou CPF do tomador");
    document.frm.txt_cnpj_cpf_tom.focus();
    return;
  }
  if (document.frm.sel_cnpj_cpf_tom.value == "F") {
    if (!validacpf()) {
      alert("Número de CPF inválido!");
      document.frm.txt_cnpj_cpf_tom.focus();
      return false;
    }
  }
  else {
    if (!validacnpj()) {
      alert("Número de CNPJ inválido!");
      document.frm.txt_cnpj_cpf_tom.focus();
      return false;
    }
  }
  if (parent.gbl.avs()) return false;
  parent.gbl.seta_avs(50);
  document.frm.hdd_in_substituto_trib_tom.value = "0";
  document.frm.hdd_in_retido_not.value = "0";
  parent.gbl.acessa('g', "snfse00100a3.asp", "txt_cnpj_cpf_tom="+document.frm.txt_cnpj_cpf_tom.value);
}
function consultar_tomador_inscr() {
  if (document.frm.txt_inscr_municipal_tom.value == "") {
    alert("Informe a inscrição do tomador em Goiânia");
    document.frm.txt_inscr_municipal_tom.focus();
    return;
  }
  if (parent.gbl.avs()) return false;
  parent.gbl.seta_avs(50);
  document.frm.hdd_in_substituto_trib_tom.value = "0";
  document.frm.hdd_in_retido_not.value = "0";
  parent.gbl.acessa('g', "snfse00100a1.asp", "txt_inscr_municipal_tom="+document.frm.txt_inscr_municipal_tom.value);
}
function consultar_substituida() {
  if (document.frm.txt_numero_substituida_not.value == "") {
    alert("Informe o número da Nota Fiscal a ser substituída");
    document.frm.txt_numero_substituida_not.focus();
    return false;
  }
  if (parent.gbl.avs()) return false;
  parent.gbl.seta_avs(50);
  prg = "/sistemas/snfse/asp/snfse00100w1.asp?txt_nr_substituida="+document.frm.txt_numero_substituida_not.value+"&data_nota_substituta=";
  j1  = window.open(prg,"j1","toolbar=no,location=no,directories=no,scrollbars=yes,status=yes,width=700,height=300,top=230,left=150");
}
function consultar_codg_municipio1() {
  if (parent.gbl.avs()) return false;
  parent.gbl.seta_avs(50);
  parent.gbl.acessa('g', "snfse00100a2.asp", "txt_codg_municipio="+document.frm.txt_codg_municipio_tom.value+"&n=1");
}
function consultar_codg_municipio2() {
  if (parent.gbl.avs()) return false;
  parent.gbl.seta_avs(50);
  parent.gbl.acessa('g', "snfse00100a2.asp", "txt_codg_municipio="+document.frm.txt_codg_municipio_not.value+"&n=2");
}
function consultar_nome_municipio1() {
  nome_munic = document.frm.txt_nome_municipio_tom.value.toUpperCase();
  if (document.frm.txt_nome_municipio_tom.value.length < 3) {
    alert("Informe pelos menos 3 letras iniciais");
    document.frm.txt_nome_municipio_tom.focus();
    return;
  }
  if (parent.gbl.avs()) return false;
  parent.gbl.seta_avs(50);
  prg = "/sistemas/snfse/asp/snfse00100w0.asp?txt_nome_municipio="+document.frm.txt_nome_municipio_tom.value+"&n=1";
  j2  = window.open(prg,"j2","toolbar=no,location=no,directories=no,scrollbars=yes,status=yes,width=500,height=300,top=230,left=200");
}
function consultar_nome_municipio2() {
  nome_munic = document.frm.txt_nome_municipio_not.value.toUpperCase();
  if (document.frm.txt_nome_municipio_not.value.length < 3) {
    alert("Informe pelos menos 3 letras iniciais");
    document.frm.txt_nome_municipio_not.focus();
    return;
  }
  if (parent.gbl.avs()) return false;
  parent.gbl.seta_avs(50);
  prg = "/sistemas/snfse/asp/snfse00100w0.asp?txt_nome_municipio="+document.frm.txt_nome_municipio_not.value+"&n=2";
  j2  = window.open(prg,"j2","toolbar=no,location=no,directories=no,scrollbars=yes,status=yes,width=500,height=300,top=230,left=200");
}
sinf = "";
pdig = "";
function define_modalidade_situacao() {

  document.getElementById("modalidade").innerHTML = "";
  document.getElementById("situacaoNF").innerHTML = "";
  document.getElementById("situacaoST").innerHTML = "";


  document.getElementById("alq").style.display = "none";
  //document.frm.sel_info_aliquota_not.value = "5,00";
  document.frm.sel_info_aliquota_not.value = "0,00";


  if (document.frm.sel_codg_atividade_not.value == "") return;
  ind_atv = document.frm.sel_codg_atividade_not.selectedIndex;
  if (parent.gbl.gbl_codg_atv[2] == "") ind_atv = ind_atv + 1;


  document.getElementById("alq1").style.display = "inline";
  if (document.frm.sel_codg_atividade_not.value == "") {
    document.getElementById("alq1").innerHTML = "0,00";
  }
  else {
    if (parent.gbl.gbl_situ_atv[ind_atv] == undefined) {
      alq_atv = "0,00"
    }
    else {
      alq_atv = parent.gbl.gbl_situ_atv[ind_atv].substr(5,1) + "," + parent.gbl.gbl_situ_atv[ind_atv].substr(6,2);
    }
    document.getElementById("alq1").innerHTML = "<b>" + alq_atv + "</b>";
  }


  document.getElementById("red").disabled = true;
  document.frm.hdd_in_base_reduzida_not.value = "N";


  document.frm.txt_valr_deducoes_not.disabled = true;


  if (document.frm.hdd_in_substituto_trib_tom.value == 1) document.frm.hdd_in_retido_not.value = 1;


  document.frm.hdd_in_nfdiaria_pre.value = parent.gbl.gbl_situ_atv[ind_atv].substr(8,1);


  moda = parent.gbl.gbl_situ_atv[ind_atv].substr(4,1);
  if (moda == "1") document.getElementById("modalidade").innerHTML = "ISSQN NORMAL";
  if (moda == "2") {
    document.getElementById("modalidade").innerHTML = "SIMPLES NACIONAL";
    if(parent.gbl.gbl_situ_atv[ind_atv].substr(1,1) != "5"){
      document.getElementById("alq").style.display    = "inline";
      document.frm.sel_info_aliquota_not.value        = "";
      document.getElementById("alq1").style.display   = "none";
    }
  }
  if (moda == "3") document.getElementById("modalidade").innerHTML = "ATO 3 (ESTIMATIVA ESPECIAL)";
  if (moda == "4") document.getElementById("modalidade").innerHTML = "ATO 4 (ESTIMATIVA GERAL)";


  sinf = parent.gbl.gbl_situ_atv[ind_atv].substr(1,1);


  if (parent.gbl.gbl_liminar > 0) {
    document.getElementById("situacaoNF").innerHTML = "LIMINAR/DECISÃO JUDICIAL";
    document.frm.hdd_in_retido_not.value = 0;
    return;
  }

  if (parent.gbl.gbl_fixo_simples_nacional == 1) {
    document.getElementById("alq").style.display = "none";
    //document.frm.sel_info_aliquota_not.value = "5,00";
    document.frm.sel_info_aliquota_not.value = "0,00";
    document.getElementById("situacaoNF").innerHTML = "IMPOSTO FIXO";
    document.frm.hdd_in_retido_not.value = 0;

    if (document.frm.sel_codg_atividade_not.value == "791120000") {
      document.getElementById("red").disabled     = false;
      document.frm.hdd_in_base_reduzida_not.value = "S";
    }
    return;
  }

  if (parent.gbl.gbl_SIMEI == 1) {
    document.getElementById("alq").style.display = "none";
    //document.frm.sel_info_aliquota_not.value = "5,00";
    document.frm.sel_info_aliquota_not.value = "0,00";
    document.getElementById("situacaoNF").innerHTML = "NORMAL";
    document.frm.hdd_in_retido_not.value = 0;
    return;
  }

  if (parent.gbl.gbl_est_digital == 1) {
    if (parent.gbl.gbl_aliq_edigital > 0) {
      pdig = parent.gbl.gbl_aliq_edigital;
    }
    else {
      if (parent.gbl.gbl_edig_atv[ind_atv] > 0) {
        pdig = parent.gbl.gbl_edig_atv[ind_atv];
      }
      else {
        pdig = 0;
      }
    }
    if (pdig > 0) {
      document.getElementById("alq").style.display = "none";
      document.getElementById("alq1").style.display = "";
      //document.frm.sel_info_aliquota_not.value = "5,00";
      document.frm.sel_info_aliquota_not.value = "0,00";
      document.getElementById("situacaoNF").innerHTML = "ESTAÇÃO DIGITAL" + " ("+ parent.gbl.formatavlr(pdig/100) +"%)";
      document.frm.hdd_in_base_reduzida_not.value = "S";
      if (document.frm.hdd_in_retido_not.value == 1) document.getElementById("situacaoST").innerHTML = "IMPOSTO A SER RETIDO PELO TOMADOR";
      document.getElementById("red").disabled = false;
      return;
    }
  }

  if (parent.gbl.gbl_call_center == 1) {
  …