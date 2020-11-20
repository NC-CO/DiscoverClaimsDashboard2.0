import sys
import xlwings as xw
import json


def print_to_stdout(*a):
    # Here a is the array holding the objects
    # passed as the arguement of the function
    print(*a, file=sys.stdout)


def main():
    arg1 = sys.argv[1]
    arg1 = json.loads(arg1)
   # cool = json.loads(arg1)
    # print(cool["Actual"])
   # arg1 = json.dumps(arg1)
    wb = xw.Book('PDOA.xlsx')
    shtDC = wb.sheets['Client\'s DC Results']
    shtCash = wb.sheets['Cash Flow']
    shtLeg = wb.sheets['CC & UCC Legacy Data']
    shtFor = wb.sheets['CC & UCC Forward Flow']
    shtOp = wb.sheets['Opportunity Assessment']
    # shtDC.range('D9').value = arg1
    #a5 = str(shtLeg.range('B4').value)
    shtDC.range('C46').value = arg1[0]["Actual"]
    shtDC.range('C47').value = arg1[1]["Actual"]
    shtDC.range('C48').value = arg1[2]["Actual"]
    shtDC.range('C49').value = arg1[3]["Actual"]
    shtDC.range('C50').value = arg1[4]["Actual"]
    shtDC.range('C51').value = arg1[5]["Actual"]
    shtDC.range('C52').value = arg1[6]["Actual"]
    shtDC.range('C53').value = arg1[7]["Actual"]
    shtDC.range('C54').value = arg1[8]["Actual"]
    shtDC.range('C55').value = arg1[9]["Actual"]
    shtDC.range('C56').value = arg1[10]["Actual"]
    shtDC.range('C57').value = arg1[11]["Actual"]
    shtDC.range('C58').value = arg1[12]["Actual"]
    shtDC.range('C59').value = arg1[13]["Actual"]
    shtDC.range('C60').value = arg1[14]["Actual"]
    shtDC.range('C61').value = arg1[15]["Actual"]
    shtDC.range('C62').value = arg1[16]["Actual"]
    shtDC.range('C63').value = arg1[17]["Actual"]
    shtDC.range('C64').value = arg1[18]["Actual"]
    shtDC.range('C65').value = arg1[19]["Actual"]
    shtDC.range('C66').value = arg1[20]["Actual"]
    shtDC.range('C67').value = arg1[21]["Actual"]
    shtDC.range('C68').value = arg1[22]["Actual"]
    shtDC.range('C69').value = arg1[23]["Actual"]
    shtDC.range('C70').value = arg1[24]["Actual"]
    shtDC.range('C71').value = arg1[25]["Actual"]
    shtDC.range('C72').value = arg1[26]["Actual"]
    shtDC.range('C73').value = arg1[27]["Actual"]
    shtDC.range('C74').value = arg1[28]["Actual"]
    shtDC.range('C75').value = arg1[29]["Actual"]
    shtDC.range('C76').value = arg1[30]["Actual"]
    shtDC.range('C77').value = arg1[31]["Actual"]
    shtDC.range('C78').value = arg1[32]["Actual"]
    shtDC.range('C79').value = arg1[33]["Actual"]
    shtDC.range('C80').value = arg1[34]["Actual"]
    shtDC.range('C81').value = arg1[35]["Actual"]
    shtDC.range('C82').value = arg1[36]["Actual"]
    shtDC.range('C83').value = arg1[37]["Actual"]
    shtDC.range('C84').value = arg1[38]["Actual"]
    shtDC.range('C85').value = arg1[39]["Actual"]
    shtDC.range('C86').value = arg1[40]["Actual"]
    shtDC.range('C87').value = arg1[41]["Actual"]
    shtDC.range('C88').value = arg1[42]["Actual"]
    shtDC.range('C89').value = arg1[43]["Actual"]
    shtDC.range('C90').value = arg1[44]["Actual"]
    shtDC.range('C91').value = arg1[45]["Actual"]
    shtDC.range('F46').value = arg1[0]["Actual__1"]
    shtDC.range('F47').value = arg1[1]["Actual__1"]
    shtDC.range('F48').value = arg1[2]["Actual__1"]
    shtDC.range('F49').value = arg1[3]["Actual__1"]
    shtDC.range('F50').value = arg1[4]["Actual__1"]
    shtDC.range('F51').value = arg1[5]["Actual__1"]
    shtDC.range('F52').value = arg1[6]["Actual__1"]
    shtDC.range('F53').value = arg1[7]["Actual__1"]
    shtDC.range('F54').value = arg1[8]["Actual__1"]
    shtDC.range('F55').value = arg1[9]["Actual__1"]
    shtDC.range('F56').value = arg1[10]["Actual__1"]
    shtDC.range('F57').value = arg1[11]["Actual__1"]
    shtDC.range('F58').value = arg1[12]["Actual__1"]
    shtDC.range('F59').value = arg1[13]["Actual__1"]
    shtDC.range('F60').value = arg1[14]["Actual__1"]
    shtDC.range('F61').value = arg1[15]["Actual__1"]
    shtDC.range('F62').value = arg1[16]["Actual__1"]
    shtDC.range('F63').value = arg1[17]["Actual__1"]
    shtDC.range('F64').value = arg1[18]["Actual__1"]
    shtDC.range('F65').value = arg1[19]["Actual__1"]
    shtDC.range('F66').value = arg1[20]["Actual__1"]
    shtDC.range('F67').value = arg1[21]["Actual__1"]
    shtDC.range('F68').value = arg1[22]["Actual__1"]
    shtDC.range('F69').value = arg1[23]["Actual__1"]
    shtDC.range('F70').value = arg1[24]["Actual__1"]
    shtDC.range('F71').value = arg1[25]["Actual__1"]
    shtDC.range('F72').value = arg1[26]["Actual__1"]
    shtDC.range('F73').value = arg1[27]["Actual__1"]
    shtDC.range('F74').value = arg1[28]["Actual__1"]
    shtDC.range('F75').value = arg1[29]["Actual__1"]
    shtDC.range('F76').value = arg1[30]["Actual__1"]
    shtDC.range('F77').value = arg1[31]["Actual__1"]
    shtDC.range('F78').value = arg1[32]["Actual__1"]
    shtDC.range('F79').value = arg1[33]["Actual__1"]
    shtDC.range('F80').value = arg1[34]["Actual__1"]
    shtDC.range('F81').value = arg1[35]["Actual__1"]
    shtDC.range('F82').value = arg1[36]["Actual__1"]
    shtDC.range('F83').value = arg1[37]["Actual__1"]
    shtDC.range('F84').value = arg1[38]["Actual__1"]
    shtDC.range('F85').value = arg1[39]["Actual__1"]
    shtDC.range('F86').value = arg1[40]["Actual__1"]
    shtDC.range('F87').value = arg1[41]["Actual__1"]
    shtDC.range('F88').value = arg1[42]["Actual__1"]
    shtDC.range('F89').value = arg1[43]["Actual__1"]
    shtDC.range('F90').value = arg1[44]["Actual__1"]
    shtDC.range('F91').value = arg1[45]["Actual__1"]


    a = str(shtCash.range('F11').value)
    b = str(shtCash.range('G11').value)
    c = str(shtCash.range('H11').value)
    d = str(shtCash.range('I11').value)
    e = str(shtCash.range('J11').value)
    f = str(shtCash.range('K11').value)
    g = str(shtCash.range('L11').value)
    h = str(shtCash.range('M11').value)
    i = str(shtCash.range('N11').value)
    j = str(shtCash.range('O11').value)
    k = str(shtCash.range('P11').value)
    l = str(shtCash.range('Q11').value)
    m = str(shtCash.range('R11').value)
    n = str(shtCash.range('S11').value)
    o = str(shtCash.range('T11').value)
    p = str(shtCash.range('U11').value)
    a1 = str(shtCash.range('F12').value)
    b1 = str(shtCash.range('G12').value)
    c1 = str(shtCash.range('H12').value)
    d1 = str(shtCash.range('I12').value)
    e1 = str(shtCash.range('J12').value)
    f1 = str(shtCash.range('K12').value)
    g1 = str(shtCash.range('L12').value)
    h1 = str(shtCash.range('M12').value)
    i1 = str(shtCash.range('N12').value)
    j1 = str(shtCash.range('O12').value)
    k1 = str(shtCash.range('P12').value)
    l1 = str(shtCash.range('Q12').value)
    m1 = str(shtCash.range('R12').value)
    n1 = str(shtCash.range('S12').value)
    o1 = str(shtCash.range('T12').value)
    p1 = str(shtCash.range('U12').value)
    a2 = str(shtCash.range('F13').value)
    b2 = str(shtCash.range('G13').value)
    c2 = str(shtCash.range('H13').value)
    d2 = str(shtCash.range('I13').value)
    e2 = str(shtCash.range('J13').value)
    f2 = str(shtCash.range('K13').value)
    g2 = str(shtCash.range('L13').value)
    h2 = str(shtCash.range('M13').value)
    i2 = str(shtCash.range('N13').value)
    j2 = str(shtCash.range('O13').value)
    k2 = str(shtCash.range('P13').value)
    l2 = str(shtCash.range('Q13').value)
    m2 = str(shtCash.range('R13').value)
    n2 = str(shtCash.range('S13').value)
    o2 = str(shtCash.range('T13').value)
    p2 = str(shtCash.range('U13').value)
    a3 = str(shtCash.range('F14').value)
    b3 = str(shtCash.range('G14').value)
    c3 = str(shtCash.range('H14').value)
    d3 = str(shtCash.range('I14').value)
    e3 = str(shtCash.range('J14').value)
    f3 = str(shtCash.range('K14').value)
    g3 = str(shtCash.range('L14').value)
    h3 = str(shtCash.range('M14').value)
    i3 = str(shtCash.range('N14').value)
    j3 = str(shtCash.range('O14').value)
    k3 = str(shtCash.range('P14').value)
    l3 = str(shtCash.range('Q14').value)
    m3 = str(shtCash.range('R14').value)
    n3 = str(shtCash.range('S14').value)
    o3 = str(shtCash.range('T14').value)
    p3 = str(shtCash.range('U14').value)
    a4 = str(shtCash.range('F106').value)
    b4 = str(shtCash.range('G106').value)
    c4 = str(shtCash.range('H106').value)
    d4 = str(shtCash.range('I106').value)
    e4 = str(shtCash.range('J106').value)
    f4 = str(shtCash.range('K106').value)
    g4 = str(shtCash.range('L106').value)
    h4 = str(shtCash.range('M106').value)
    i4 = str(shtCash.range('N106').value)
    j4 = str(shtCash.range('O106').value)
    k4 = str(shtCash.range('P106').value)
    l4 = str(shtCash.range('Q106').value)
    m4 = str(shtCash.range('R106').value)
    n4 = str(shtCash.range('S106').value)
    o4 = str(shtCash.range('T106').value)
    p4 = str(shtCash.range('U106').value)
    a5 = str(shtLeg.range('B4').value)
    b5 = str(shtLeg.range('C4').value)
    c5 = str(shtLeg.range('D4').value)
    d5 = str(shtLeg.range('B6').value)
    e5 = str(shtLeg.range('C6').value)
    f5 = str(shtLeg.range('D6').value)
    g5 = str(shtLeg.range('E6').value)
    h5 = str(shtLeg.range('B8').value)
    i5 = str(shtLeg.range('C8').value)
    j5 = str(shtLeg.range('E8').value)
    k5 = str(shtLeg.range('B9').value)
    l5 = str(shtLeg.range('C9').value)
    m5 = str(shtLeg.range('D9').value)
    n5 = str(shtLeg.range('E9').value)
    o5 = str(shtLeg.range('B10').value)
    p5 = str(shtLeg.range('C10').value)
    q5 = str(shtLeg.range('B11').value)
    r5 = str(shtLeg.range('C11').value)
    s5 = str(shtLeg.range('D11').value)
    t5 = str(shtLeg.range('E11').value)
    u5 = str(shtLeg.range('B13').value)
    v5 = str(shtLeg.range('C13').value)
    w5 = str(shtLeg.range('D13').value)
    x5 = str(shtLeg.range('F13').value)
    y5 = str(shtLeg.range('G13').value)
    z5 = str(shtLeg.range('B14').value)
    aa5 = str(shtLeg.range('C14').value)
    ab5 = str(shtLeg.range('D14').value)
    ac5 = str(shtLeg.range('F14').value)
    ad5 = str(shtLeg.range('G14').value)
    ae5 = str(shtLeg.range('B15').value)
    af5 = str(shtLeg.range('C15').value)
    ag5 = str(shtLeg.range('D15').value)
    ah5 = str(shtLeg.range('F15').value)
    ai5 = str(shtLeg.range('G15').value)
    aj5 = str(shtLeg.range('F16').value)
    ak5 = str(shtLeg.range('G16').value)
    a6 = str(shtFor.range('B4').value)
    b6 = str(shtFor.range('C4').value)
    c6 = str(shtFor.range('D4').value)
    d6 = str(shtFor.range('B6').value)
    e6 = str(shtFor.range('C6').value)
    f6 = str(shtFor.range('D6').value)
    g6 = str(shtFor.range('E6').value)
    h6 = str(shtFor.range('B8').value)
    i6 = str(shtFor.range('C8').value)
    j6 = str(shtFor.range('E8').value)
    k6 = str(shtFor.range('B9').value)
    l6 = str(shtFor.range('C9').value)
    m6 = str(shtFor.range('D9').value)
    n6 = str(shtFor.range('E9').value)
    o6 = str(shtFor.range('B10').value)
    p6 = str(shtFor.range('C10').value)
    q6 = str(shtFor.range('B11').value)
    r6 = str(shtFor.range('C11').value)
    s6 = str(shtFor.range('D11').value)
    t6 = str(shtFor.range('E11').value)
    u6 = str(shtFor.range('B13').value)
    v6 = str(shtFor.range('C13').value)
    w6 = str(shtFor.range('D13').value)
    x6 = str(shtFor.range('F13').value)
    y6 = str(shtFor.range('G13').value)
    z6 = str(shtFor.range('B14').value)
    aa6 = str(shtFor.range('C14').value)
    ab6 = str(shtFor.range('D14').value)
    ac6 = str(shtFor.range('F14').value)
    ad6 = str(shtFor.range('G14').value)
    ae6 = str(shtFor.range('B15').value)
    af6 = str(shtFor.range('C15').value)
    ag6 = str(shtFor.range('D15').value)
    ah6 = str(shtFor.range('F15').value)
    ai6 = str(shtFor.range('G15').value)
    aj6 = str(shtFor.range('F16').value)
    ak6 = str(shtFor.range('G16').value)
    qw1 = str(shtOp.range('B2').value)
    qw2 = str(shtOp.range('C2').value)
    qw3 = str(shtOp.range('D2').value)
    qw4 = str(shtOp.range('E2').value)
    qw5 = str(shtOp.range('F2').value)
    al6 = str(shtOp.range('G2').value)
    am6 = str(shtOp.range('H2').value)
    an6 = str(shtOp.range('I2').value)
    ao6 = str(shtOp.range('J2').value)
    ap6 = str(shtOp.range('K2').value)
    aq6 = str(shtOp.range('L2').value)
    ar6 = str(shtOp.range('M2').value)
    as6 = str(shtOp.range('N2').value)
    at6 = str(shtOp.range('O2').value)
    au6 = str(shtOp.range('P2').value)
    av6 = str(shtOp.range('Q2').value)
    aw6 = str(shtOp.range('R2').value)
    ax = str(shtCash.range('F107').value)
    ay = str(shtCash.range('G107').value)
    az = str(shtCash.range('H107').value)
    ba = str(shtCash.range('I107').value)
    bb = str(shtCash.range('J107').value)
    bc = str(shtCash.range('K107').value)
    bd = str(shtCash.range('L107').value)
    be = str(shtCash.range('M107').value)
    bf = str(shtCash.range('N107').value)
    bg = str(shtCash.range('O107').value)
    bh = str(shtCash.range('P107').value)
    bi = str(shtCash.range('Q107').value)
    bj = str(shtCash.range('R107').value)
    bk = str(shtCash.range('S107').value)
    bl = str(shtCash.range('T107').value)
    bm = str(shtCash.range('U107').value)
    bn = str(shtCash.range('F108').value)
    bo = str(shtCash.range('G108').value)
    bp = str(shtCash.range('H108').value)
    bq = str(shtCash.range('I108').value)
    br = str(shtCash.range('J108').value)
    bs = str(shtCash.range('K108').value)
    bt = str(shtCash.range('L108').value)
    bu = str(shtCash.range('M108').value)
    bv = str(shtCash.range('N108').value)
    bw = str(shtCash.range('O108').value)
    bx = str(shtCash.range('P108').value)
    by = str(shtCash.range('Q108').value)
    bz = str(shtCash.range('R108').value)
    ca = str(shtCash.range('S108').value)
    cb = str(shtCash.range('T108').value)
    cc = str(shtCash.range('U108').value)
    cd = str(shtCash.range('F109').value)
    ce = str(shtCash.range('G109').value)
    cf = str(shtCash.range('H109').value)
    cg = str(shtCash.range('I109').value)
    ch = str(shtCash.range('J109').value)
    ci = str(shtCash.range('K109').value)
    cj = str(shtCash.range('L109').value)
    ck = str(shtCash.range('M109').value)
    cl = str(shtCash.range('N109').value)
    cm = str(shtCash.range('O109').value)
    cn = str(shtCash.range('P109').value)
    co = str(shtCash.range('Q109').value)
    cp = str(shtCash.range('R109').value)
    cq = str(shtCash.range('S109').value)
    cr = str(shtCash.range('T109').value)
    cs = str(shtCash.range('U109').value)
    ct = str(shtCash.range('F111').value)
    cu = str(shtCash.range('G111').value)
    cv = str(shtCash.range('H111').value)
    cw = str(shtCash.range('I111').value)
    cx = str(shtCash.range('J111').value)
    cy = str(shtCash.range('K111').value)
    cz = str(shtCash.range('L111').value)
    da = str(shtCash.range('M111').value)
    db = str(shtCash.range('N111').value)
    dc = str(shtCash.range('O111').value)
    dd = str(shtCash.range('P111').value)
    de = str(shtCash.range('Q111').value)
    df = str(shtCash.range('R111').value)
    dg = str(shtCash.range('S111').value)
    dh = str(shtCash.range('T111').value)
    di = str(shtCash.range('U111').value)
    dj = str(shtCash.range('F113').value)
    dk = str(shtCash.range('G113').value)
    dl = str(shtCash.range('H113').value)
    dm = str(shtCash.range('I113').value)
    dn = str(shtCash.range('J113').value)
    do = str(shtCash.range('K113').value)
    dp = str(shtCash.range('L113').value)
    dq = str(shtCash.range('M113').value)
    dr = str(shtCash.range('N113').value)
    ds = str(shtCash.range('O113').value)
    dt = str(shtCash.range('P113').value)
    du = str(shtCash.range('Q113').value)
    dv = str(shtCash.range('R113').value)
    dw = str(shtCash.range('S113').value)
    dx = str(shtCash.range('T113').value)
    dy = str(shtCash.range('U113').value)
    dz = str(shtCash.range('F115').value)
    ea = str(shtCash.range('G115').value)
    eb = str(shtCash.range('H115').value)
    ec = str(shtCash.range('I115').value)
    ed = str(shtCash.range('J115').value)
    ee = str(shtCash.range('K115').value)
    ef = str(shtCash.range('L115').value)
    eg = str(shtCash.range('M115').value)
    eh = str(shtCash.range('N115').value)
    ei = str(shtCash.range('O115').value)
    ej = str(shtCash.range('P115').value)
    ek = str(shtCash.range('Q115').value)
    el = str(shtCash.range('R115').value)
    em = str(shtCash.range('S115').value)
    en = str(shtCash.range('T115').value)
    eo = str(shtCash.range('U115').value)

    print_to_stdout(a + '|' + b + '|' + c + '|' + d + '|'
                    + e + '|' + f + '|' + g + '|' + h + '|' + i + '|' + j +
                    '|' + k + '|' + l + '|' + m + '|' + n + '|' + o + '|' +
                    p + '|' + a1 + '|' + b1 + '|' + c1 + '|' + d1 + '|' + e1 + '|'
                    + f1 + '|' + g1 + '|' + h1 + '|' + i1 + '|' + j1 + '|' + k1 + '|' +
                    l1 + '|' + m1 + '|' + n1 + '|' + o1 + '|' + p1 + '|' + a2 + '|' +
                    b2 + '|' + c2 + '|' + d2 + '|' + e2 + '|' + f2 + '|' + g2 + '|' +
                    h2 + '|' + i2 + '|' + j2 + '|' + k2 + '|' + l2 + '|' + m2 + '|' +
                    n2 + '|' + o2 + '|' + p2 + '|' + a3 + '|' + b3 + '|' + c3 + '|' + d3
                    + '|' + e3 + '|' + f3 + '|' + g3 + '|' + h3 + '|' + i3 + '|' + j3 +
                    '|' + k3 + '|' + l3 + '|' + m3 + '|' + n3 + '|' + o3 + '|' + p3 + '|'
                    + a4 + '|' + b4 + '|' + c4 + '|' + d4 + '|' + e4 + '|' + f4 + '|' + g4 +
                    '|' + h4 + '|' + i4 + '|' + j4 + '|' + k4 + '|' + l4 + '|' + m4 + '|'
                    + n4 + '|' + o4 + '|' + p4 + '|' + a5 + '|' + b5 + '|' + c5 + '|' + d5 + '|' + e5
                    + '|' + f5 + '|' + g5 + '|' + h5 + '|' + i5 + '|' + j5 + '|' + k5 + '|' + l5
                    + '|' + m5 + '|' + n5 + '|' + o5 + '|' + p5 + '|' + q5 + '|' + r5 + '|' + s5
                    + '|' + t5 + '|' + u5 + '|' + v5 + '|' + w5 + '|' + x5 + '|' + y5 + '|' + z5
                    + '|' + aa5 + '|' + ab5 + '|' + ac5 + '|' + ad5 + '|' + ae5 + '|' + af5 + '|' + ag5
                    + '|' + ah5 + '|' + ai5 + '|' + aj5 + '|' + ak5 + '|' + a6 + '|' + b6 + '|' + c6 +
                    '|' + d6 + '|' + e6 + '|' + f6 + '|' + g6 + '|' + h6 + '|' + i6 + '|'
                    + j6 + '|' + k6 + '|' + l6 + '|' + m6 + '|' + n6 + '|' + o6 + '|'
                    + p6 + '|' + q6 + '|' + r6 + '|' + s6 + '|' + t6 + '|' + u6 + '|'
                    + v6 + '|' + w6 + '|' + x6 + '|' + y6 + '|' + z6 + '|' + aa6 + '|'
                    + ab6 + '|' + ac6 + '|' + ad6 + '|' + ae6 + '|' + af6 + '|' + ag6
                    + '|' + ah6 + '|' + ai6 + '|' + aj6 + '|' + ak6 + '|' + qw1 + '|' + qw2 + '|' + qw3 + '|' + qw4 + '|' +
                    qw5 + '|' + al6 + '|' + am6
                    + '|' + an6 + '|' + ao6 + '|' + ap6 + '|' + aq6 + '|' + ar6 + '|' + as6
                    + '|' + at6 + '|' + au6 + '|' + av6 + '|' + aw6 + '|' + ax + '|' + ay + '|' + az + '|' + ba + '|' + bb + '|' + bc + '|' + bd + '|' + be + '|' + bf + '|' + bg + '|' + bh + '|' + bi + '|' + bj + '|' + bk +
                    '|' + bl + '|' + bm + '|' + bn + '|' + bo + '|' + bp + '|' + bq + '|' + br + '|' + bs + '|' + bt + '|' + bu + '|' + bv + '|' + bw + '|' + bx + '|' + by + '|' + bz + '|' + ca + '|' + cb + '|' + cc +
                    '|' + cd + '|' + ce + '|' + cf + '|' + cg + '|' + ch + '|' + ci + '|' + cj + '|' + ck + '|' + cl + '|' + cm + '|' + cn + '|' + co + '|' + cp + '|' + cq + '|' + cr + '|' + cs + '|' + ct + '|' + cu +
                    '|' + cv + '|' + cw + '|' + cx + '|' + cy + '|' + cz + '|' + da + '|' + db + '|' + dc + '|' + dd + '|' + de + '|' + df + '|' + dg + '|' + dh + '|' + di + '|' + dj + '|' + dk + '|' + dl + '|' + dm +
                    '|' + dn + '|' + do + '|' + dp + '|' + dq + '|' + dr + '|' + ds + '|' + dt + '|' + du + '|' + dv + '|' + dw + '|' + dx + '|' + dy + '|' + dz + '|' + ea + '|' + eb + '|' + ec + '|' + ed + '|' + ee +
                    '|' + ef + '|' + eg + '|' + eh + '|' + ei + '|' + ej + '|' + ek + '|' + el + '|' + em + '|' + en + '|' + eo)


if __name__ == "__main__":
    main()
