const functionList = [
  {
    funCategory: "0,1,2",
    funDescription: "ACOS(number)：返回指定角度数字的反余弦值。\r\nnumber：需要求出反余弦值的任意角度。\r\n注意：number值必须在-1~1之间（包括-1和1）。返回的角度值在 0 和 PI 之间。\r\n\r\n示例：\r\nACOS(0.5) -> 1.0471975511965979",
    funName: "ACOS",
    funTypeName: "三角函数",
    id: "102"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ACOSH(number)：返回指定角度数字的反双曲余弦值。\r\nnumber：需要求出反双曲余弦值的任意角度。\r\n注意：number值必须大于等于1\r\n\r\n示例：\r\nACOSH(2) -> 1.3169578969248166",
    funName: "ACOSH",
    funTypeName: "三角函数",
    id: "106"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ASIN(number)：返回指定角度数字的反正弦值。\r\nnumber：需要求出反正弦值的任意角度。\r\n注意：指定数值必须在 -1 到 1 之间（含 1 与 -1）。 返回角度在 -pi/2 到 pi/2 之间（含 -pi/2 与 pi/2）\r\n\r\n示例：\r\nASIN(0.5) -> 0.5235987755982989",
    funName: "ASIN",
    funTypeName: "三角函数",
    id: "101"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ASINH(number)：返回指定角度数字的反双曲正弦值。\r\nnumber：需要求出反双曲正弦值的任意角度。\r\n\r\n示例：\r\nASINH(-2) -> -1.4436354751788099",
    funName: "ASINH",
    funTypeName: "三角函数",
    id: "105"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ATAN(number)：返回指定角度数字的反正切值。\r\nnumber：需要求出反正切值的任意角度。\r\n注意： 返回角度在-pi/2到pi/2之间。\r\n\r\n示例：\r\nATAN(-1) -> -0.7853981633974483",
    funName: "ATAN",
    funTypeName: "三角函数",
    id: "103"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ATAN2(x,y)：返回指定坐标的反正切值。\r\nx：横坐标\r\ny：纵坐标\r\n注意：当 x 与 y 不可同时为0。\r\n示例：\r\nATAN2(-2,2) -> 2.356194490192345",
    funName: "ATAN2",
    funTypeName: "三角函数",
    id: "104"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ATANH(number)：返回指定角度数字的反双曲正切值。\r\nnumber：需要求出反双曲正切值的任意角度。\r\n注意：指定的number必须介于-1~1之间（不包括-1，1）\r\n\r\n示例：\r\nATANH(0.5) -> 0.5493061443340549",
    funName: "ATANH",
    funTypeName: "三角函数",
    id: "107"
  },
  {
    funCategory: "0,1,2",
    funDescription: "COS(number)：返回指定角度数字的余弦值。\r\nnumber：需要求出余弦值的任意角度。\r\n\r\n示例：\r\nCOS(-15) -> -0.7596879128588213",
    funName: "COS",
    funTypeName: "三角函数",
    id: "96"
  },
  {
    funCategory: "0,1,2",
    funDescription: "COSH(number)：返回指定角度数字的双曲余弦值。\r\nnumber：需要求出双曲余弦值的任意角度。\r\n\r\n示例：\r\nCOSH(-5) -> 74.20994852478785",
    funName: "COSH",
    funTypeName: "三角函数",
    id: "99"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DEGREES(number)：将弧度转化为度。\nnumber：任意弧度值。\n\n示例：DEGREES(3.14) -> 179.90874767107852",
    funName: "DEGREES",
    funTypeName: "三角函数",
    id: "108"
  },
  {
    funCategory: "0,1,2",
    funDescription: "RADIANS(number)：将角度转换成弧度。\r\nnumber：任意角度。\r\n\r\n示例：\r\nRADIANS(180) -> 3.141592653589793",
    funName: "RADIANS",
    funTypeName: "三角函数",
    id: "109"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SIN(number)：返回指定角度数字的正弦值。\r\nnumber：需要求出正弦值的任意角度。\r\n\r\n示例：\r\nSIN(-15) -> -0.6502878401571168",
    funName: "SIN",
    funTypeName: "三角函数",
    id: "95"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SINH(number)：返回指定角度数字的双曲正弦值。\r\nnumber：需要求出双曲正弦值的任意角度。\r\n\r\n示例：\r\nSINH(-5) -> -74.20321057778875",
    funName: "SINH",
    funTypeName: "三角函数",
    id: "98"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TAN(number)：返回指定角度数字的正切值。\r\nnumber：需要求出正切值的任意角度。\r\n\r\n示例：\r\nTAN(-15) -> 0.8559934009085188",
    funName: "TAN",
    funTypeName: "三角函数",
    id: "97"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TANH(number)：返回指定角度数字的双曲正切值。\r\nnumber：需要求出双曲正切值的任意角度。\r\n\r\n示例：\r\nTANH(-15) -> 0.9999092042625951",
    funName: "TANH",
    funTypeName: "三角函数",
    id: "100"
  },
  {
    funCategory: "1,2",
    funDescription: "CORREL(array1,array2):求两个相同长度数据系列的相关系数(与Excel的同名函数作用相同)。\r\narray1,array2:相同长度的数组\r\n\r\n示例：\r\n=CORREL([1,2,3],[2,4,6]) -> 1",
    funName: "CORREL",
    funTypeName: "其他",
    id: "111"
  },
  {
    funCategory: "1,2",
    funDescription: "INDEX(arry,index1,index2)返回矩阵中指定位置的值（此为excel方法）\r\narry源矩阵，可一维可二维\r\nindex1 行序列\r\nindex2 列序列\r\n\r\nINDEX(arry,index)\r\narry同上解释\r\nindex当行数为1是默认为列序列，当列数为1时默认为行序列\r\n\r\n示例：\r\n返回第二列\r\nINDEX([2,4,6],2) -> 4\r\n返回第二行\r\nINDEX([[4],[6],[8]],2) -> 6\r\n返回第二行第三列\r\nINDEX([[1,2,3],[4,5,6],[7,8,9]],2,3) -> 6",
    funName: "INDEX",
    funTypeName: "其他",
    id: "110"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ISNULL(obj)判断对象中所有的值是否全部都是NULL或者为空字符串。\r\nobj类型可为字符串，数字，表达式\r\n\r\n示例：\r\nISNULL(\"\") -> true\r\nISNULL(\"ABC\") -> false",
    funName: "ISNULL",
    funTypeName: "其他",
    id: "112"
  },
  {
    funCategory: "1,2",
    funDescription: "MEDIAN(matrix)返回数据系列的中值(与Excel的同名函数作用相同)。\r\nmatrix 目标矩阵，可拉取多个单元格进行选取\r\n\r\n \r\nMEDIAN([1,2,3]) -> 2\r\nMEDIAN([[1,2,3],[7,6,8]]) ->4.5",
    funName: "MEDIAN",
    funTypeName: "其他",
    id: "113"
  },
  {
    funCategory: "1,2",
    funDescription: "RANK(number,matrix,[order])当前number在matrix矩阵中的排名，[order]：0为降序，1为升序\r\nnumber：数值，可写成数值字符串，需要查询的目标数值\r\nmatrix：目标矩阵，需要计算的矩阵\r\norder：0为降序排序，1为升序排序\r\n\r\n示例：\r\nRANK(1,[[1,2,3],[4,5,6]],1) -> 1\r\nRANK(1,[[1,2,3],[4,5,6]],0) -> 6",
    funName: "RANK",
    funTypeName: "其他",
    id: "114"
  },
  {
    funCategory: "1,2",
    funDescription: "STDEV(matrix1...)：计算数据系列的标准偏差(与Excel的同名函数作用相同)。\r\nmatrix1,matrix2：需要计算标准差的矩阵\r\n\r\n示例：\r\nSTDEV([[1,2,3],[4,5,6]],[[7,8],[9,10]]) -> 3.0276503540974917\r\nSTDEV(1,2,9) -> 4.358898943540674\r\nSTDEV([1,2,8]) -> 3.785938897200183",
    funName: "STDEV",
    funTypeName: "其他",
    id: "115"
  },
  {
    funCategory: "0,1,2",
    funDescription: "UUID([num])返回随机的UUID。\r\nnum(可选)：\r\n1.可填32,获取32位不带“-”的随机字符串\r\n2.不填写或者填写36,获取36位不带四个“-”的随机字符串\r\n\r\n示例：\r\nUUID()或者UUID(36) -> 5c407d49-4784-45b7-998b-2b514082e977\r\nUUID(32) -> 4651327f230542d5a7cfb073f91cc08e",
    funName: "UUID",
    funTypeName: "其他",
    id: "116"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ABS(number)：返回指定数字的绝对值，绝对值是指没有正负符号的数值。\r\nnumber：需要求出绝对值的任意实数。\r\n\r\n示例：\r\nABS(-1.5) -> 1.5\r\nABS(0) -> 0\r\nABS(2.5) -> 2.5",
    funName: "ABS",
    funTypeName: "数学",
    id: "1"
  },
  {
    funCategory: "0,1,2",
    funDescription: "CEILING(number)：将参数沿绝对值增大的方向，舍入为最接近的整数。\r\nnumber：数值。\r\n\r\n示例：\r\nCEILING(-2.5) -> -3\r\nCEILING(0.5) -> 1",
    funName: "CEILING",
    funTypeName: "数学",
    id: "2"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DECIMAL(number)：返回number的大数类型。\r\nnumber：数值。\r\n\r\n示例：\r\nDECIMAL(-2.5) -> -2.5\r\nDECIMAL(0.5) -> 0.5",
    funName: "DECIMAL",
    funTypeName: "数学",
    id: "3"
  },
  {
    funCategory: "0,1,2",
    funDescription: "FLOOR(number)：将参数沿绝对值减小的方向去尾舍入。\r\nnumber：数值。\r\n\r\n示例：\r\nFLOOR(2.5) -> 2\r\nFLOOR(-3.5) -> -3\r\nFLOOR(0.143) -> 0",
    funName: "FLOOR",
    funTypeName: "数学",
    id: "4"
  },
  {
    funCategory: "0,1,2",
    funDescription: "INT(number)：返回数字下舍入（数值减小的方向）后最接近的整数值。\r\nnumber：数值。\r\n\r\n示例：\r\nINT(2.5) -> 2\r\nINT(-3.5) -> -4\r\nINT(0.143) -> 0",
    funName: "INT",
    funTypeName: "数学",
    id: "5"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MOD(number,divisor)：返回两数相除的余数。结果的正负号与除数相同。\r\nnumber：被除数。\r\ndivisor：除数（不可为0）。\r\n\r\n示例：\r\nMOD(3, 2) -> 1\r\nMOD(-3, 2) -> 1\r\nMOD(3, -2) -> -1\r\nMOD(-3, -2) -> -1\r\nMOD(49.5, 5.5) -> 0",
    funName: "MOD",
    funTypeName: "数学",
    id: "6"
  },
  {
    funCategory: "0,1,2",
    funDescription: "PRODUCT(number1,number2, ...)：将所有以参数形式给出的数相乘，并返回乘积值。\r\nnumber1,number2, ...：为 1 到 n个需要相乘的数字参数。\r\n\r\n示例：\r\nPRODUCT(3,4) -> 12\r\nPRODUCT(3,4,5) -> 60",
    funName: "PRODUCT",
    funTypeName: "数学",
    id: "7"
  },
  {
    funCategory: "0,1,2",
    funDescription: "PROMOTION(number1,number2)：返回number2在number1上提升的比例。\r\nnumber1：数字参数1。\r\nnumber2：数字参数2。\r\n\r\n示例：\r\nPROMOTION(0,4) -> 4(400%)\r\nPROMOTION(1,1.43) -> 0.43(43%)\r\nPROMOTION(-1,1.43) -> 2.43(243%)",
    funName: "PROMOTION",
    funTypeName: "数学",
    id: "8"
  },
  {
    funCategory: "0,1,2",
    funDescription: "RAND()：返回一个随机数。数值位于区域[0,1]，每计算一次工作表，函数都会返回一个新的随机数值。\r\n\r\n示例：\r\nRAND() -> 0.0035063007221989295\r\nRAND() -> 0.7999090496641816",
    funName: "RAND",
    funTypeName: "数学",
    id: "9"
  },
  {
    funCategory: "0,1,2",
    funDescription: "RANDBETWEEN(number1,number2):返回number1和number2之间的一个随机整数。\r\nnumber1：数字参数1。\r\nnumber2：数字参数2。\r\n\r\n示例：\r\nRANDBETWEEN(12.333, 13.233) -> 13\r\nRANDBETWEEN(11.2, 13.3) -> 12或13",
    funName: "RANDBETWEEN",
    funTypeName: "数学",
    id: "10"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ROUND(number,num_digits)：返回某个数字按指定位数舍入后的数字。\r\nnumber：需要进行舍入的数字。\r\nnum_digits：舍入后的数字的位数。\r\n\r\n如果 num_digits 大于 0，则舍入到指定的小数位。\r\n如果 num_digits 等于 0，则舍入到最接近的整数。\r\n如果 num_digits 小于 0，则在小数点左侧进行舍入。\r\n\r\n示例：\r\nROUND(2.15, 1) -> 2.2\r\nROUND(-1.475, 2) -> -1.48\r\nROUND(21.5, -1) -> 20",
    funName: "ROUND",
    funTypeName: "数学",
    id: "11"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ROUNDDOWN(number,num_digits)：靠近零值，向下（绝对值减小的方向）舍入数字。 \r\nnumber：为需要向下舍入的任意实数。\r\nnum_digits：舍入后的数字的位数。\r\n\r\n如果 num_digits 大于 0，则舍入到指定的小数位。\r\n如果 num_digits 等于 0，则舍入到最接近的整数。\r\n如果 num_digits 小于 0，则在小数点左侧进行舍入。\r\n\r\n示例：\r\nROUNDDOWN(76.9,0) -> 76\r\nROUNDDOWN(3.14159, 3) -> 3.141\r\nROUNDDOWN(-3.14159, 1) -> -3.1\r\nROUNDDOWN(31415.92654, -2) -> 31400",
    funName: "ROUNDDOWN",
    funTypeName: "数学",
    id: "12"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ROUNDUP(number,num_digits)：远离零值，向上（绝对值增大的方向）舍入数字。\r\nnumber：为需要向上舍入的任意实数。\r\nnum_digits：舍入后的数字的位数。\r\n\r\n如果 num_digits 大于 0，则舍入到指定的小数位。\r\n如果 num_digits 等于 0，则舍入到最接近的整数。\r\n如果 num_digits 小于 0，则在小数点左侧进行舍入。\r\n\r\n示例：\r\nROUNDUP(76.4,0) -> 77\r\nROUNDUP(3.14159, 3) -> 3.142\r\nROUNDUP(-3.14159, 1) -> -3.2\r\nROUNDUP(31415.92654, -2) -> 31500",
    funName: "ROUNDUP",
    funTypeName: "数学",
    id: "13"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SIGN(number)：返回数字的符号。当数字为正数时返回 1，为零时返回 0，为负数时返回 -1。\r\nNumber：为任意实数。\r\n\r\n示例：\r\nSIGN(10) -> 1\r\nSIGN(0) -> 0\r\nSIGN(-0.00001) -> -1",
    funName: "SIGN",
    funTypeName: "数学",
    id: "14"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TRUNC(number,num_digits)：取整。将数字的小数部分截去，返回整数。\r\nnumber：需要截尾取整的数字。\r\nnum_digits：用于指定取整精度的数字。\r\n\r\n如果 num_digits 大于 0，则舍入到指定的小数位。\r\n如果 num_digits 等于 0，则舍入到最接近的整数。\r\n如果 num_digits 小于 0，则在小数点左侧进行舍入。\r\n\r\n示例：\r\nTRUNC(8.9) -> 8\r\nTRUNC(-812.9, -2) -> -800\r\nTRUNC(3.14159, 4) -> 3.1415",
    funName: "TRUNC",
    funTypeName: "数学",
    id: "15"
  },
  {
    funCategory: "0,1,2",
    funDescription: "CHAR(number)：根据指定数字代码返回对应的字符。CHAR 函数可将计算机其他类型的数字代码转换为字符。\r\nnumber：用于指定字符的数字，介于 1 和 65535 之间（包括 1 和 65535）。\r\n\r\n示例：\r\nCHAR(88) -> 'X'\r\nCHAR(45) -> '-'",
    funName: "CHAR",
    funTypeName: "文本",
    id: "16"
  },
  {
    funCategory: "0,1,2",
    funDescription: "CNMONEY(number,[unit])：返回人民币大写。保留到金额分。超过千万亿，则不支持使用该函数。\r\nnumber：需要转换的数值型的数。\r\nunit：单位（可选），\"s\"(拾), \"b\"(佰), \"q\"(仟), \"w\"(万), \"sw\"(拾万), \"bw\"(佰万), \"qw\"(仟万), \"y\"(亿), \"sy\"(拾亿), \"by\"(佰亿), \"qy\"(仟亿), \"wy\"(万亿), \"swy\"(拾万亿), \"bwy\"(佰万亿), \"qwy\"(仟万亿)\r\n\r\n示例：\r\nCNMONEY(1200) -> 壹仟贰佰圓整\r\nCNMONEY(1200.78) -> 壹仟贰佰圓柒角捌分\r\nCNMONEY(1200, \"qw\") -> 壹佰贰拾亿圓整\r\nCNMONEY(1.2005, \"qwy\") -> 壹仟贰佰万亿伍仟亿圓整",
    funName: "CNMONEY",
    funTypeName: "文本",
    id: "17"
  },
  {
    funCategory: "0,1,2",
    funDescription: "CODE(text)：计算文本串中第一个字符的数字代码。返回的代码对应于计算机使用的字符集。\r\ntext：需要计算第一个字符代码的文本或单元格引用。\r\n\r\n示例：\r\nCODE(\"S\") -> 83\r\nCODE(\"Spreadsheet\") -> 83",
    funName: "CODE",
    funTypeName: "文本",
    id: "18"
  },
  {
    funCategory: "0,1,2",
    funDescription: "CONCATENATE(text1,text2,...)：将数个文本合并成一个文本。\r\ntext1,text2,...：需要合并成单个文本的文本项，可以是字符，数字或是单元格引用。\r\n\r\n示例：\r\nCONCATENATE(\"Average \",\"Price\") -> \"Average Price\"\r\nCONCATENATE(\"1\",\"2\") -> \"12\"",
    funName: "CONCATENATE",
    funTypeName: "文本",
    id: "19"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ENBYSTRNUM(text,number)：单元格按照指定字数换行显示。\r\ntext：待换行文本。\r\nnumber：指定换行字数的数值。\r\n\r\n示例：\r\nENBYSTRNUM(\"SoftWare\", 4)\r\n -> \r\nSoft\r\nWare",
    funName: "ENBYSTRNUM",
    funTypeName: "文本",
    id: "20"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ENDWITH(text1,text2):判断文本text1是否以text2结束。\r\ntext1：文本1。\r\ntext2：文本2。\r\n\r\n备注：\r\ntext1 和 text2 都是大小写敏感的。\r\n \r\n示例：\r\nENDWITH(\"BiReport\",\"Report\") -> true\r\nENDWITH(\"BiReport\",\"report\") -> false",
    funName: "ENDWITH",
    funTypeName: "文本",
    id: "21"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ENMONEY(number)：将给定的数字转换成英文金额文本。超过千万亿，则不支持使用该函数。\r\nnumber：数值。\r\n \r\n示例：\r\nENMONEY(23.49) -> Twenty Three And Cents Forty Nine\r\nENMONEY(100000000000000) -> One Hundred Zero Trillion",
    funName: "ENMONEY",
    funTypeName: "文本",
    id: "22"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ENNUMBER(number)：将给定的数字转化成英文文本。超过千万亿，则不支持使用该函数。\r\nnumber：数值。\r\n \r\n示例：\r\nENNUMBER(23.49) -> Twenty Three Point Four Nine\r\nENNUMBER(100000000000000) -> One Hundred Zero Trillion",
    funName: "ENNUMBER",
    funTypeName: "文本",
    id: "23"
  },
  {
    funCategory: "0,1,2",
    funDescription: "EXACT(text1,text2)：检测两组文本是否相同。如果完全相同，EXACT 函数返回 true；否则，返回 false。EXACT 函数区分大小写。\r\ntext1：文本1。\r\ntext2：文本2。\r\n \r\n示例：\r\nEXACT(\"Spreadsheet\",\"Spreadsheet\") -> true\r\nEXACT(\"Spreadsheet\",\"SpreadSheet\") -> false",
    funName: "EXACT",
    funTypeName: "文本",
    id: "24"
  },
  {
    funCategory: "0,1,2",
    funDescription: "FIND(find_text,within_text,[start_num])：从指定的索引(start_num)处开始，返回第一次出现的指定子字符串(find_text)在此字符串(within_text)中的索引。\r\nfind_text：需要查找的文本或包含文本的单元格引用。\r\nwithin_text：包含需要查找文本的文本或单元格引用。\r\nstart_num：（可选、默认1）指定进行查找字符的索引位置。\r\n\r\n示例：\r\nFIND(\"i\",\"Information\") -> 9\r\nFIND(\"o\",\"Information\",5) -> 10\r\nFIND(\"c\",\"Information\") -> 0",
    funName: "FIND",
    funTypeName: "文本",
    id: "25"
  },
  {
    funCategory: "0,1,2",
    funDescription: "FORMAT(text,format)：返回text的format格式。\r\ntext：文本。\r\nformat：格式化样式。\r\n\r\n示例：\r\nFORMAT(1234.5,\"#,##0.00\") -> 1,234.50\r\nFORMAT(1234.5,\"#,##0\") -> 1,235\r\nFORMAT(1234.5,\"￥#,##0.00\") -> ￥1,234.50\r\nFORMAT(1234.5,\"$#,##0.00\") -> $1,234.50\r\nFORMAT(1.5,\"0%\") -> 150%\r\nFORMAT(1.5,\"0.000%\") -> 150.000%\r\nFORMAT(6789,\"##0.0E0\") -> 6.789E3\r\nFORMAT(6789,\"0.00E00\") -> 6.79E03",
    funName: "FORMAT",
    funTypeName: "文本",
    id: "26"
  },
  {
    funCategory: "0,1,2",
    funDescription: "GETCHARNUM(text1,text2)：计算字符串中指定字符个数。\r\ntext1：原始文本。\r\ntext2：匹配文本。\r\n\r\n示例：\r\nGETCHARNUM(\"AAAaaabbb\", \"c\") -> 0\r\nGETCHARNUM(\"AAAaaabbb\", \"a\") -> 3\r\nGETCHARNUM(\"aaaaaabbb\", \"aa\") -> 3\r\nGETCHARNUM(\"AAAaaabbb\", \"ab\") -> 1",
    funName: "GETCHARNUM",
    funTypeName: "文本",
    id: "27"
  },
  {
    funCategory: "0,1,2",
    funDescription: "INDEXOF(text,index)：返回文本text在index位置上的字符。index 是从 0 开始计数的。\r\ntext：文本。\r\nindex：指定位置。\r\n\r\n备注：\r\nindex 的值必须等于或大于 0。\r\n如果 index 不是整数，将被取整。\r\n如果 index 大于整个文本的长度，INDEXOF 函数将返回空字符。\r\n\r\n示例：\r\nINDEXOF(\"BiReport\",0) -> \"B\"\r\nINDEXOF(\"BiReport\",2.5) -> \"R\"\r\nINDEXOF(\"BiReport\",7) -> \"t\"\r\nINDEXOF(\"BiReport\",8) -> \"\"",
    funName: "INDEXOF",
    funTypeName: "文本",
    id: "28"
  },
  {
    funCategory: "0,1,2",
    funDescription: "LEFT(text,[num_chars])：根据指定的字符数返回文本串中的第一个或前几个文本。\r\ntext：文本。\r\nnum_chars：（可选、默认1）所需长度。\r\n\r\n备注：\r\nnum_chars 的值必须等于或大于 0。\r\n如果 num_chars 不是整数，将被取整。\r\n如果 num_chars 大于整个文本的长度，LEFT 函数将返回所有的文本。\r\n\r\n示例：\r\nLEFT(\"BiReport\") -> \"B\"\r\nLEFT(\"BiReport\",2.5) -> \"Bi\"\r\nLEFT(\"BiReport\",8) -> \"BiReport\"\r\nLEFT(\"BiReport\",9) -> \"BiReport\"",
    funName: "LEFT",
    funTypeName: "文本",
    id: "29"
  },
  {
    funCategory: "0,1,2",
    funDescription: "LEN(text)：返回文本串中的字符数。\r\ntext：需要求其长度的文本，空格也计为字符。\r\n\r\n示例：\r\nLEN(\"soft ware\") -> 9",
    funName: "LEN",
    funTypeName: "文本",
    id: "30"
  },
  {
    funCategory: "0,1,2",
    funDescription: "LOWER(text)：将所有的大写字母转化为小写字母。LOWER 函数不转化文本串中非字母的字符。\r\ntext：需要转化为小写字母的文本。\r\n\r\n示例：\r\nLOWER(\"Soft Ware\") -> \"soft ware\"",
    funName: "LOWER",
    funTypeName: "文本",
    id: "31"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MID(text,start_num,num_chars)：返回文本串中从指定位置开始的一定数目的字符。\r\ntext：包含要提取字符的文本串。\r\nstart_num：文本中需要提取字符的起始位置。文本中第一个字符的 start_num为 1，依此类推。\r\nnum_chars：返回字符的长度。\r\n\r\n备注：\r\n如果 start_num 大于文本长度，MID 函数返回\"\"（空文本）。\r\n如果 start_num 小于文本长度，并且 start_num 加上 num_chars 大于文本长度，MID 函数将从 start_num 指定的起始字符直至文本末的所有字符。\r\n\r\n示例：\r\nMID(\"Soft Ware\",1,4) -> \"soft\"\r\nMID(\"Soft Ware\",6,4) -> \"Ware\"\r\nMID(\"Soft Ware\",6,8) -> \"Ware\"\r\nMID(\"Soft Ware\",12,5) -> \"\"",
    funName: "MID",
    funTypeName: "文本",
    id: "32"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MIDCHAR(text,char,[number],[direction])：截取某字符前或后所有的字符（未找到截取标识符时，返回空文本）。\r\ntext：被截取文本。\r\nchar：截取标识符，可以是数字、字符。\r\nnumber：（可选、默认1）第几次出现（非0整数）。\r\ndirection：（可选、默认true）false向前截取、true向后截取。\r\n\r\n备注：\r\nnumber为正整数时，为正数第number个截取标识符；\r\nnumber为负整数时，为倒数第number个截取标识符；\r\nnumber绝对值超出字符串中个数时，返回空文本；\r\n\r\n示例：\r\nMIDCHAR(\"1234666\", '6') -> \"66\"\r\nMIDCHAR(\"1234666\", '6', 2) -> \"6\"\r\nMIDCHAR(\"1234666\", '6', 3) -> \"\"\r\nMIDCHAR(\"1234666\", '6', false) -> \"1234\"\r\nMIDCHAR(\"1234666\", '6', 2, false) -> \"12346\"\r\nMIDCHAR(\"1234666\", '7') -> \"\"",
    funName: "MIDCHAR",
    funTypeName: "文本",
    id: "33"
  },
  {
    funCategory: "0,1,2",
    funDescription: "NUMTO(number)：返回number的中文表示。超过千万亿，则不支持使用该函数。\r\nnumber：需要转换的数值型的数。\r\n\r\n示例：\r\nNUMTO(102.5) -> 一百零二点五\r\nNUMTO(-102.5) -> 负一百零二点五\r\nNUMTO(1000000000000000) -> 一千万亿",
    funName: "NUMTO",
    funTypeName: "文本",
    id: "34"
  },
  {
    funCategory: "0,1,2",
    funDescription: "NUMTOZH(number,[type])：将数字转换成中文形式。超过千万亿，则不支持使用该函数。\r\nnumber：需要处理的具体数字。\r\ntype：（可选、默认1）1(中文小写数值)/2(中文大写数值)/3(中文小写数字)。\r\n\r\n示例：\r\nNUMTOZH(\"1200034.21\") -> 一百二十万三十四点二一\r\nNUMTOZH(\"1200034.21\", 1) -> 一百二十万三十四点二一\r\nNUMTOZH(\"1200034.21\", 2) -> 壹佰贰拾万叁拾肆点贰壹\r\nNUMTOZH(\"1200034.21\", 3) -> 一二零零零三四点二一",
    funName: "NUMTOZH",
    funTypeName: "文本",
    id: "35"
  },
  {
    funCategory: "0,1,2",
    funDescription: "PROPER(text)：将文本中的第一个字母和所有非字母字符后的第一个字母转化成大写，其他字母变为小写。\r\ntext：文本。\r\n\r\n示例：\r\nPROPER(\"Soft ware\") -> Soft Ware\r\nPROPER(\"Soft WARE\") -> Soft Ware",
    funName: "PROPER",
    funTypeName: "文本",
    id: "36"
  },
  {
    funCategory: "0,1,2",
    funDescription: "用法一：\r\nREGEXP(text, pattern)：文本text是否与正则表达式 pattern 相匹配。\r\ntext：文本。\r\npattern：正则表达式。\r\n\r\n示例：\r\nREGEXP(\"aaaaac\",\"a*c\") -> true\r\nREGEXP(\"abc\",\"a*c\") -> false\r\n\r\n用法二：\r\nREGEXP(str, pattern, intNumber)：文本text是否与具有给定模式 intNumber 的正则表达式 pattern 相匹配。\r\nintNumber：\r\nUNIX_LINES = 1：启用Unix行模式。\r\nCASE_INSENSITIVE = 2：启用不区分大小写的匹配。\r\nCOMMENTS = 4：允许在模式中使用空格和注释。\r\nMULTILINE = 8：启用多行模式。\r\nLITERAL = 16：启用模式的文字分析。\r\nDOTALL = 32：启用DOTALL模式。\r\nUNICODE_CASE = 64：启用支持Unicode的大小写折叠。\r\nCANON_EQ = 128：启用规范等效。\r\nCANON_EQ = 256：启用预定义字符类和POSIX字符类的Unicode版本。\r\n\r\n示例：\r\nREGEXP(\"Aaaaac\",\"a*c\",2) -> true\r\nREGEXP(\"Aaaaac\",\"a*c\",64) -> false",
    funName: "REGEXP",
    funTypeName: "文本",
    id: "37"
  },
  {
    funCategory: "0,1,2",
    funDescription: "REPEAT(text,[number_times])：根据指定的次数重复显示文本。REPEAT 函数可用来显示同一字符串，并对单元格进行填充。\r\ntext：需要重复显示的文本或包含文本的单元格引用。\r\nnumber_times：（可选、默认1）指定文本重复的次数，且为正数。\r\n\r\n备注：\r\n如果 number_times 为 0，REPEAT 函数将返回\"\"（空文本）。\r\n如果 number_times 不是整数，将被取整。\r\nREPEAT 函数的最终结果通常不大于 32767 个字符（若超过32767 个字符，则显示【Too Long Text For Excel Cell】）。\r\n\r\n示例：\r\nREPEAT(\"0123456789-\") -> \"0123456789-\"\r\nREPEAT(\"0123456789-\",0) -> \"\"\r\nREPEAT(\"0123456789-\",4) -> \"0123456789-0123456789-0123456789-0123456789-\"\r\nREPEAT(\"0\",32768) -> \"Too Long Text For Excel Cell\"",
    funName: "REPEAT",
    funTypeName: "文本",
    id: "38"
  },
  {
    funCategory: "0,1,2",
    funDescription: "用法一：替换所有符合条件的文本\r\nREPLACE(text, texttoreplace, replacetext)：根据指定字符串，用其他文本来代替原始文本中的内容。\r\ntext：原始文本或单元格引用。\r\ntexttoreplace：被替换的文本。\r\nreplacetext：替换的文本。\r\n\r\n示例：\r\nREPLACE(\"abcd\",\"a\",re\") -> \"rebcd\"\r\nREPLACE(\"abad\",\"a\",re\") -> \"rebred\"\r\n\r\n替换指定位置的文本\r\nREPLACE(old_text,start_num,num_chars,new_text)：根据指定长度，用其他文本来替换原文本中指定位置和长度的内容。\r\nold_text：原始文本或单元格引用。\r\nstart_num：替换的起始位置。\r\nnum_chars:  替换的长度，即被替换文本的字符数。\r\nnew_text：替换的文本。\r\n\r\n示例：\r\nREGEXP(\"0123456789\",5,4,\"*\") -> \"0123*89\"\r\nREGEXP(\"0123456789\",5,10,\"*\") -> \"0123*\"\r\nREGEXP(\"0123456789\",15,2,\"*\") -> \"0123456789*\"",
    funName: "REPLACE",
    funTypeName: "文本",
    id: "39"
  },
  {
    funCategory: "0,1,2",
    funDescription: "RIGHT(text,[num_chars])：根据指定的字符数从右开始返回文本串中的最后一个或几个字符。\r\ntext：包含需要提取字符的文本串或单元格引用。\r\nnum_chars：（可选、默认1）指定 RIGHT 函数从文本串中提取的字符数。num_chars 不能小于 0。\r\n\r\n备注：\r\n如果 num_chars 大于文本串长度，RIGHT函数将返回整个文本。\r\n\r\n示例：\r\nRIGHT(\"It is interesting\",6) -> \"esting\"\r\nRIGHT(\"It is interesting\") -> \"g\"\r\nRIGHT(\"It is interesting\",20) -> \"It is interesting\"",
    funName: "RIGHT",
    funTypeName: "文本",
    id: "40"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SPLIT(text1,text2)：返回由text2分割text1组成的文本数组。\r\ntext1：以双引号表示的文本\r\ntext2：以双引号表示的分隔符。例如逗号\",\"\r\n\r\n示例：\r\nSPLIT(\"hello word\",\" \") -> [\"hello\", \"word\"]",
    funName: "SPLIT",
    funTypeName: "文本",
    id: "41"
  },
  {
    funCategory: "0,1,2",
    funDescription: "STARTWITH(text1,text2)：判断文本text1是否以text2开始。\r\ntext1：文本1。\r\ntext2：文本2。\r\n\r\n备注：text1 和 text2 都是大小写敏感的。\r\n\r\n示例：\r\nSTARTWITH(\"hello word\",\"hello\") -> true\r\nSTARTWITH(\"hello word\",\"Hello\") -> false",
    funName: "STARTWITH",
    funTypeName: "文本",
    id: "42"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SUBSTITUTE(text,old_text,new_text,instance_num)：用new_text替换文本串中的old_text。\r\ntext：需要被替换字符的文本，或含有文本的单元格引用。\r\nold_text：需要被替换的部分文本。\r\nnew_text：用于替换 old_text 的文本。\r\ninstance_num：指定用 new_text 来替换第几次出现的 old_text。如果指定了 instance_num，则只有指定位置上的 old_text 被替换，否则文字串中出现的所有 old_text 都被 new_text 替换。\r\n\r\n示例：\r\nSUBSTITUTE(\"2023\",\"2\",\"1\") -> \"1013\"\r\nSUBSTITUTE(\"2023\",\"2\",\"1\", 1) -> \"1023\"\r\nSUBSTITUTE(\"2023\",\"2\",\"1\", 2) -> \"2013\"\r\nSUBSTITUTE(\"2023\",\"2\",\"1\", 3) -> \"2023\"",
    funName: "SUBSTITUTE",
    funTypeName: "文本",
    id: "43"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TEXTGETNUM(text)：提取文本中的数字，并按照原数字顺序显示。\r\ntext：文本。\r\n\r\n示例：\r\nTEXTGETNUM(\"SoftWare\") -> 空白\r\nTEXTGETNUM(\"So12 ft34Ware\") -> 1234",
    funName: "TEXTGETNUM",
    funTypeName: "文本",
    id: "44"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TODOUBLE(text)：将文本转换成 Double 对象。\r\ntext：需要转换的文本。\r\n\r\n示例：\r\nTODOUBLE(\"123.21\") -> 123.21",
    funName: "TODOUBLE",
    funTypeName: "文本",
    id: "45"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TOINTEGER(text)：将文本转换成Integer对象，可以返回Integer范围内的整数。（-2147483648 ~ 2147483647）。\r\ntext：需要转换的文本。\r\n\r\n示例：\r\nTOINTEGER(\"123\") -> 123\r\nTOINTEGER(\"123.21\") -> 123",
    funName: "TOINTEGER",
    funTypeName: "文本",
    id: "46"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TOLONG(text)：将文本转换成Long对象，可以返回Long范围内的整数。（-9223372036854775808 ~ 9223372036854775807）。\r\ntext：需要转换的文本。\r\n\r\n示例：\r\nTOLONG(\"123\") -> 123\r\nTOLONG(\"123.21\") -> 123",
    funName: "TOLONG",
    funTypeName: "文本",
    id: "47"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TRIM(text)：清除文本首尾所有的空格。\r\ntext：需要清除首尾空格的文本。\r\n\r\n示例：\r\nTRIM(\"  123  \") -> \"123\"\r\nTRIM(\"  1 2 3  \") -> \"  1 2 3  \"",
    funName: "TRIM",
    funTypeName: "文本",
    id: "48"
  },
  {
    funCategory: "0,1,2",
    funDescription: "UPPER(text)：将文本中所有的字符转化为大写。UPPER 函数不转化文本串中非字母的字符。\r\ntext：需要转化为大写字母的文本串。\r\n\r\n示例：\r\nUPPER(\"Soft ware\") -> \"SOFT WARE\"\r\nUPPER(\"Soft Ware\") -> \"SOFT WARE\"",
    funName: "UPPER",
    funTypeName: "文本",
    id: "49"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATEDELTA(date,delta)：返回指定日期后delta日的日期。\r\ndate：指定日期\r\ndelta：为0时，返回指定日期；正整数时，日相加后日期；负整数时，日相减后日期。\r\n\r\n示例：\r\nDATEDELTA(\"2023-12-12\", 0) -> 2023-12-12\r\nDATEDELTA(\"2023-12-12\", 10) -> 2023-12-22\r\nDATEDELTA(\"2023-12-12\", -10) -> 2023-12-02",
    funName: "DATEDELTA",
    funTypeName: "日期",
    id: "50"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATEDIF(start_date,end_date,unit,[method])：返回两个指定日期间的天数、月数或年数。\r\nstart_date：开始日期\r\nend_date：结束日期\r\nunit：单位\r\nmethod：（可选、默认返回绝对值），若填写-1、则会考虑正负情况。\r\n\r\n备注：\r\n若unit=\"Y\"，则DATEDIF返回指定时间段的年差数。\r\n若unit=\"M\"，则DATEDIF返回指定时间段的月差数。\r\n若unit=\"D\"，则DATEDIF返回指定时间段的日差数。\r\n若unit=\"MD\"，则DATEDIF忽略年和月，返回指定时间段的日差数。\r\n若unit=\"YM\"，则DATEDIF忽略年和日，返回指定时间段的月差数。\r\n若unit=\"YD\"，则DATEDIF忽略年，返回指定时间段的日差数。\r\n\r\n示例：\r\nDATEDIF(\"2020-01-01\",\"2023-12-13\",\"Y\") -> 3\r\nDATEDIF(\"2023-01-01\",\"2023-12-13\",\"M\") -> 11\r\nDATEDIF(\"2023-01-01\",\"2023-12-13\",\"D\") -> 346\r\nDATEDIF(\"2020-01-01\",\"2023-12-13\",\"MD\") -> 12（忽略月和年后，相差12天）\r\nDATEDIF(\"2020-01-01\",\"2023-12-13\",\"YM\") -> 11（忽略年和日，相差11个月）\r\nDATEDIF(\"2020-01-01\",\"2023-12-13\",\"YD\") -> 346（忽略年，相差346天）",
    funName: "DATEDIF",
    funTypeName: "日期",
    id: "51"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATEINMONTH(date, number)：函数返回在某一个月当中第几天的日期。\r\ndate：日期\r\nnumber：指定天数（如果超出有效日期，顺延）\r\n\r\n示例：\r\nDATEINMONTH(\"2023-01-01\", 31) -> \"2023-01-31\"\r\nDATEINMONTH(\"2023-01-01\", 32) -> \"2023-02-01\"",
    funName: "DATEINMONTH",
    funTypeName: "日期",
    id: "52"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATEINQUARTER(date, number)：函数返回在某一个季度当中第几天的日期。\r\ndate：日期\r\nnumber：指定天数（如果超出有效日期，顺延）\r\n\r\n示例：\r\nDATEINQUARTER(\"2023-05-01\", 32) -> \"2023-05-02\"\r\nDATEINQUARTER(\"2023-05-01\", 100) -> \"2023-07-09\"",
    funName: "DATEINQUARTER",
    funTypeName: "日期",
    id: "53"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATEINWEEK(date, number)：函数返回在某一个周当中第几天的日期。\r\ndate：日期\r\nnumber：指定天数（如果超出有效日期，顺延）\r\n\r\n示例：\r\nDATEINWEEK(\"2023-12-13\", 2) -> \"2023-12-12\"\r\nDATEINWEEK(\"2023-12-13\", 8) -> \"2023-12-18\"",
    funName: "DATEINWEEK",
    funTypeName: "日期",
    id: "54"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATEINYEAR(date, number)：函数返回在某一个年当中第几天的日期。\r\ndate：日期\r\nnumber：指定天数（如果超出有效日期，顺延）\r\n\r\n示例：\r\nDATEINYEAR(\"2023-12-13\", 365) -> \"2023-12-31\"\r\nDATEINYEAR(\"2023-12-13\", 400) -> \"2024-02-04\"",
    funName: "DATEINYEAR",
    funTypeName: "日期",
    id: "55"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATESUBDATE(startDateTime, endDateTime, unit, [method])：返回两个日期之间的时间差。\r\nstartDateTime：开始时间\r\nendDateTime：结束时间\r\nunit：时间差单位\r\nmethod：（可选、默认返回绝对值），若填写-1、则会考虑正负情况。\r\n\r\n备注：\r\n若unit=\"s\"，以秒为单位。\r\n若unit=\"m\"，以分钟为单位。\r\n若unit=\"h\"，以小时为单位。\r\n若unit=\"d\"，以天为单位。\r\n若unit=\"w\"，以周为单位。\r\n\r\n示例：\r\nDATESUBDATE(\"2023-12-13 00:00:00\", \"2023-12-13 00:00:59\", \"s\") -> 59\r\nDATESUBDATE(\"2023-12-13 00:00:00\", \"2023-12-13 00:58:59\", \"m\") -> 58\r\nDATESUBDATE(\"2023-12-13 00:00:00\", \"2023-12-13 23:58:59\", \"h\") -> 23\r\nDATESUBDATE(\"2023-12-13 00:00:00\", \"2023-12-23 23:58:59\", \"d\") -> 10\r\nDATESUBDATE(\"2023-12-13 00:00:00\", \"2023-12-23 23:58:59\", \"w\") -> 1",
    funName: "DATESUBDATE",
    funTypeName: "日期",
    id: "56"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DATE_FORMAT(datetime, formatTo)：\r\ndatetime：日期时间。\r\nformatTo：目标格式化样式。\r\n\r\n示例：\r\nDATE_FORMAT(\"2023-01-01\", \"yyyy-MM\") -> \"2023-01\"\r\nDATE_FORMAT(\"2023-01-01\", \"yyyy/MM/dd\") -> \"2023/01/01\"\r\nDATE_FORMAT(\"2023-01-01 05:15:59\", \"yyyy-MM-dd hh:mm\") -> \"2023-01-01 05:15\"\r\nDATE_FORMAT(\"2023-01-01 05:15:59.999\", \"yyyy-MM-dd hh:mm:ss\") -> \"2023-01-01 05:15:59\"\r\nDATE_FORMAT(\"2023-01-01 05:15:59\", \"yyyy-MM-dd hh:mm:ss.SSS\") -> \"2023-01-01 05:15:59.000\"",
    funName: "DATE_FORMAT",
    funTypeName: "日期",
    id: "57"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DAY(date)：返回日期中的日。\r\ndate：日期。\r\n\r\n示例：\r\nDAY(\"2023-05-25\") -> 25",
    funName: "DAY",
    funTypeName: "日期",
    id: "58"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DAYSOFMONTH(date)：返回 某年包含的天数。\r\ndate：日期。\r\n\r\n示例：\r\nDAYSOFMONTH(\"2023-12-12\") -> 31\r\nDAYSOFMONTH(\"2023-02-12\") -> 28",
    funName: "DAYSOFMONTH",
    funTypeName: "日期",
    id: "59"
  },
  {
    funCategory: "0,1,2",
    funDescription: "DAYSOFYEAR(year)：返回 某年包含的天数。\r\nyear：年份。\r\n\r\n示例：\r\nDAYSOFYEAR(2023) -> 365\r\nDAYSOFYEAR(2024) -> 366",
    funName: "DAYSOFYEAR",
    funTypeName: "日期",
    id: "60"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ENDOFMONTH([date],[number])：日期所在月份之前或之后月份的最后一天的日期值\r\ndate：（可选、默认系统当月）指定日期。\r\nnumber：（可选、默认0）指定月份前/后月份的数量，整数；\r\n              缺省或者为0时，默认为date参数当月；\r\n              正整数时，为date之后的月份;\r\n              负整数时为date之前的月份；\r\n\r\n备注：\r\n不支持第一个参数缺省时第二个参数不缺省。\r\n\r\n示例：\r\n若系统当月为2023-12\r\nENDOFMONTH() -> \"2023-12-31\"\r\nENDOFMONTH(\"2023-12-12\") -> \"2023-12-31\"\r\nENDOFMONTH(\"2023-12-12\", 0) -> \"2023-12-31\"\r\nENDOFMONTH(\"2023-12-12\", -1) -> \"2023-11-30\"\r\nENDOFMONTH(\"2023-12-12\", 1) -> \"2024-01-31\"",
    funName: "ENDOFMONTH",
    funTypeName: "日期",
    id: "61"
  },
  {
    funCategory: "0,1,2",
    funDescription: "ISWORKDAY([date])：判断某日期是工作日还是周末；工作日返回ture，非工作日返回false；\r\ndate：（可选、默认系统当日）日期。\r\n\r\n备注：\r\n暂时仅支持周末和工作日判断，暂时不支持法定节假日。\r\n\r\n示例：\r\nISWORKDAY(\"2023-01-01\") -> false\r\nISWORKDAY(\"2021-01-01\") -> true",
    funName: "ISWORKDAY",
    funTypeName: "日期",
    id: "63"
  },
  {
    funCategory: "0,1,2",
    funDescription: "HOUR(time)：返回时间中的小时。\r\ntime：时间。\r\n\r\n示例：\r\nHOUR(\"16:40:19\") -> 16",
    funName: "HOUR",
    funTypeName: "日期",
    id: "62"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MINUTE(time)：返回时间中的分钟数。\r\ntime：时间。\r\n\r\n示例：\r\nMINUTE(\"16:40:19\") -> 40",
    funName: "MINUTE",
    funTypeName: "日期",
    id: "64"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SECOND(time)：返回时间中的秒数。\r\ntime：时间。\r\n\r\n示例：\r\nSECOND(\"16:40:19\") -> 19",
    funName: "SECOND",
    funTypeName: "日期",
    id: "69"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MONTH(date)：返回日期中的月。\r\ndate：日期。\r\n\r\n示例：\r\nMONTH(\"2023-05-25\") -> 5",
    funName: "MONTH",
    funTypeName: "日期",
    id: "65"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MONTHDELTA(date,delta)：返回指定日期后delta月的日期。\r\ndate：指定日期\r\ndelta：为0时，返回指定日期；正整数时，月相加后日期；负整数时，月相减后日期。\r\n\r\n示例：\r\nMONTHDELTA(\"2023-12-12\", 0) -> 2023-12-12\r\nMONTHDELTA(\"2023-12-12\", 10) -> 2024-10-12\r\nMONTHDELTA(\"2023-12-12\", -10) -> 2023-02-12",
    funName: "MONTHDELTA",
    funTypeName: "日期",
    id: "66"
  },
  {
    funCategory: "0,1,2",
    funDescription: "NOW()：获取当前日期和时间。\r\n\r\n示例：\r\n如果当前日期为2023-12-12 16:23:52\r\nNOW()-> \"2023-12-12 16:23:52\"",
    funName: "NOW",
    funTypeName: "日期",
    id: "67"
  },
  {
    funCategory: "0,1,2",
    funDescription: "QUARTER(date)：获取日期对应的季度，1/2/3/4。\r\ndate：日期。\r\n\r\n示例：\r\nQUARTER(\"2023-12-13\") -> 4",
    funName: "QUARTER",
    funTypeName: "日期",
    id: "68"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TIME(hour,minute,second)：返回指定的日期和时间，日期会随当天的日期改变。\r\nhour：指定小时（如果超出有效时间，顺延）\r\nminute：指定分钟（如果超出有效时间，顺延）\r\nsecond：指定秒（如果超出有效时间，顺延）\r\n\r\n示例：\r\n如果当天是2023-12-13\r\nTIME(23, 59, 59) -> \"2023-12-13 23:59:59\"\r\nTIME(24, 100, 100) -> \"2023-12-14 01:41:40\"",
    funName: "TIME",
    funTypeName: "日期",
    id: "70"
  },
  {
    funCategory: "0,1,2",
    funDescription: "TODAY()：是获取当前的日期。\r\n\r\n示例：\r\n如果当前日期为2023-12-12\r\nTODAY() -> \"2023-12-12\"",
    funName: "TODAY",
    funTypeName: "日期",
    id: "71"
  },
  {
    funCategory: "0,1,2",
    funDescription: "WEEK(date)：返回一个代表一年中的第几周的数字。\r\ndate：指定日期\r\n\r\n示例：\r\nWEEK(\"2023-01-01\") -> 1\r\nWEEK(\"2023-01-07\") -> 1\r\nWEEK(\"2023-01-08\") -> 2",
    funName: "WEEK",
    funTypeName: "日期",
    id: "72"
  },
  {
    funCategory: "0,1,2",
    funDescription: "WEEKDATE(year,month,weekOfMonth,dayOfWeek)：返回指定年月的指定周的周几的具体日期。\r\nyear：指定年。\r\nmonth：指定月。\r\nweekOfMonth：指定当月第几周。\r\ndayOfWeek：指定周几 （1 ~ 7 对应 周一 ~ 周日）。\r\n\r\n示例：\r\n每月第一周从当月的1号开始计算，1号~7号为第一周，后面依次顺推。例如、2023-12-1为周五则，12月第一周周四为2023-12-07，周五为2023-12-01，周六为2023-12-02（结果入下面示例相同）。\r\nWEEKDATE(2023,12,1,4) -> \"2023-12-07\"\r\nWEEKDATE(2023,12,1,5) -> \"2023-12-01\"\r\nWEEKDATE(2023,12,1,6) -> \"2023-12-02\"",
    funName: "WEEKDATE",
    funTypeName: "日期",
    id: "73"
  },
  {
    funCategory: "0,1,2",
    funDescription: "WEEKDAY(date,[showChinese])：获取日期并返回星期数。返回值为介于1到7之间的某一整数，分别代表星期中的某一天（从星期一到星期日）。\r\ndate：日期。\r\nshowChinese：（可选、默认false）false（结果返回1~7）；true（星期一~星期日）。\r\n\r\n示例：\r\nWEEKDAY(\"2023-12-11\") -> \"1\"\r\nWEEKDAY(\"2023-12-17\") -> \"7\"\r\nWEEKDAY(\"2023-12-11\",true) -> \"星期一\"\r\nWEEKDAY(\"2023-12-17\",true) -> \"星期日\"",
    funName: "WEEKDAY",
    funTypeName: "日期",
    id: "74"
  },
  {
    funCategory: "0,1,2",
    funDescription: "YEAR(date)：返回日期中的年。\r\ndate：日期。\r\n\r\n示例：\r\nYEAR(\"2023-12-12\") -> 2023",
    funName: "YEAR",
    funTypeName: "日期",
    id: "75"
  },
  {
    funCategory: "0,1,2",
    funDescription: "YEARDELTA(date,delta)：返回指定日期后delta年的日期。\r\ndate：日期。\r\ndelta：为0时，返回指定日期；正整数时，年相加后日期；负整数时，年相减后日期。\r\n\r\n示例：\r\nYEARDELTA(\"2023-12-12\", 0) -> \"2023-12-12\"\r\nYEARDELTA(\"2023-12-12\", 10) -> \"2033-12-12\"\r\nYEARDELTA(\"2023-12-12\", -10) -> \"2013-12-12\"",
    funName: "YEARDELTA",
    funTypeName: "日期",
    id: "76"
  },
  {
    funCategory: "0,1,2",
    funDescription: "AVERAGE(number1,number2,…,countString)：返回指定数据的平均值。\r\nnumber1,number2…：用于计算平均值的参数。\r\ncountString：判断文字、逻辑值是否参与计数（false：不参与计数 / true：参与计数）。\r\n\r\n备注：\r\n如果数组或引用参数中含有文字，逻辑值，默认参与计数，countString 为 false 则不参与计数。\r\n逻辑值：TRUE作为 1 来计算、FALSE作为 0 来计算\r\n文本：\"70\"作为 70 来计算，\"文字\"作为 0 来计算\r\n\r\n示例：\r\n如果A1:A5，分别等于11，\"\"23\"\"，文字，TRUE，25，则：\r\nAVERAGE(A1:A5) -> 12 ((11+23+0+1+25)/5=12)\r\nAVERAGE(A1:A5, false) -> 19.67 ((11+23+25)/3=19.67)",
    funName: "AVERAGE",
    funTypeName: "统计",
    id: "77"
  },
  {
    funCategory: "0,1,2",
    funDescription: "COUNT(value1,value2,…)：计算数组或数据区域中所含项的个数。\r\nvalue1,value2,…：可包含任何类型数据的参数。\r\n\r\n备注：\r\n计算数组或数据区域中所含项的个数。null值不参与统计，其他都参与计算。\r\n\r\n示例：\r\nCOUNT(4, 5) -> 2\r\nCOUNT(0, \"文字\", false) -> 3",
    funName: "COUNT",
    funTypeName: "统计",
    id: "78"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MAX(number1,number2,…)：返回指定数据区域或参数列表的最大值。\r\nnumber1,number2…：用于计算最大值的参数。\r\n\r\n备注：\r\n逻辑值：TRUE作为 1 来计算、FALSE作为 0 来计算\r\n文本：\"70\"作为 70 来计算，\"文字\"作为 0 来计算\r\n\r\n示例：\r\nMAX(40, \"70\") -> 70\r\nMAX(\"文字\", -1) -> 0",
    funName: "MAX",
    funTypeName: "统计",
    id: "79"
  },
  {
    funCategory: "0,1,2",
    funDescription: "MIN(number1,number2,…)：返回指定数据区域或参数列表的最小值。\r\nnumber1,number2…：用于计算最小值的参数。\r\n\r\n备注：\r\n逻辑值：TRUE作为 1 来计算、FALSE作为 0 来计算\r\n文本：\"70\"作为 70 来计算，\"文字\"作为 0 来计算\r\n\r\n示例：\r\nMIN(40, \"70\") -> 40\r\nMIN(\"文字\", 1) -> 0",
    funName: "MIN",
    funTypeName: "统计",
    id: "80"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SUM(number1,number2,…)：求一个指定单元格区域中所有数字之和。\r\nnumber1,number2,…：1 到 n 个参数或指定单元格区域中所有数字。\r\n\r\n备注：\r\n函数将直接键入参数中的数值、逻辑值及文本表达式计算在内。若参数是数组或引用，则只有数组或单元格引用中的数值进行计算。\r\n逻辑值：TRUE作为 1 来计算、FALSE作为 0 来计算\r\n文本：\"70\"作为 70 来计算，\"文字\"作为 0 来计算\r\n\r\n示例：\r\nSUM(70, 80) -> 150\r\nSUM(\"70\", \"80\", TRUE) -> 151（逻辑值TRUE作为1来计算；FALSE作为0计算；文本\"70\"作为70来计算。）",
    funName: "SUM",
    funTypeName: "统计",
    id: "81"
  },
  {
    funCategory: "0,1,2",
    funDescription: "FV(rate,nper,pmt,[pv],[type])：FV 是一个财务函数，基于固定利率及等额分期付款方式，返回给定期数内对投资的利息偿还额。\r\nrate：必需。 各期利率。\r\nnper：必需。 年金的付款总期数。\r\npmt：必需。 各期所应支付的金额，在整个年金期间保持不变。 通常 pmt 包括本金和利息，但不包括其他费用或税款。 如果省略 pmt，则必须包括 pv 参数。\r\npv：可选。 现值，或一系列未来付款的当前值的累积和。 如果省略 pv，则假定其值为 0（零），并且必须包括 pmt 参数。\r\ntype：可选。 数字 0（期末） 或 1（期初），用以指定各期的付款时间是在期初还是期末。 如果省略 type，则假定其值为 0（期末）。\r\n\r\n备注：\r\n对于所有参数，支出的款项，如银行存款，以负数表示；收入的款项，如股息支票，以正数表示。\r\n\r\n示例：\r\nFV(0.01, 4, -1000) -> 4060.40\r\nFV(0.01, 4, -1000, -500) -> 4580.70\r\nFV(0.01, 4, -1000, -500,1) -> 4621.31\r\nFV(0, 4, -1000, -500,1) -> 4500\r\nFV(0.01, 4, , -500) -> 520.30",
    funName: "FV",
    funTypeName: "财务",
    id: "82"
  },
  {
    funCategory: "0,1,2",
    funDescription: "IPMT(rate, per, nper, pv, [fv], [type])：是一个财务函数，返回根据定期固定付款和固定利率而定的投资在已知期间内的利息偿付额。\r\nrate：必需。 各期利率。\r\nper：必需。 指定期数，该值必须在 1 到 nper 范围内。\r\nnper：必需。 年金的付款总期数。\r\npv：必需。 现值即一系列未来付款当前值的总和。\r\nfv：可选。 未来值，或在最后一次付款后希望得到的现金余额。 如果省略 fv，则假定其值为 0（零），即贷款的未来值是 0。\r\ntype：可选。 数字 0（期末） 或 1（期初），用以指示支付时间。 如果省略 type，则假定其值为 0（期末）。\r\n\r\n备注：\r\n对于所有参数，支出的款项，如银行存款，以负数表示；收入的款项，如股息支票，以正数表示。\r\n\r\n示例：\r\nIPMT(0.01, 2, 4, -1000) -> 7.54\r\nIPMT(0.01, 2, 4, -1000, -500) -> 6.31\r\nIPMT(0.01, 2, 4, -1000, -500, 1) -> 6.24\r\nIPMT(0, 2, 4, -1000, -500, 1) -> 0.00\r\nIPMT(0, 2, 4, -1000, , 1) -> 0.00",
    funName: "IPMT",
    funTypeName: "财务",
    id: "86"
  },
  {
    funCategory: "0,1,2",
    funDescription: "NPER(rate,pmt,pv,[fv],[type])：是一个财务函数，基于固定利率及等额分期付款方式，返回某项投资的总期数。\r\nrate：必需。 各期利率。\r\npmt 必需。 各期所应支付的金额，在整个年金期间保持不变。 通常 pmt 包括本金和利息，但不包括其他费用或税款。\r\npv 必需。 现值，或一系列未来付款的当前值的累积和。\r\nfv 可选。 未来值，或在最后一次付款后希望得到的现金余额。 如果省略 fv，则假定其值为 0（例如，贷款的未来值是 0）。\r\ntype：可选。 数字 0（期末） 或 1（期初），用以指示支付时间。 如果省略 type，则假定其值为 0（期末）。\r\n\r\n备注：\r\n对于所有参数，支出的款项，如银行存款，以负数表示；收入的款项，如股息支票，以正数表示。\r\n\r\n示例：\r\nNPER(0.01, -100, -1000) -> -9.57859\r\nNPER(0.01, -100, -1000, 10000) -> 60.08212\r\nNPER(0.01, -100, -1000, 10000, 1) -> 59.67387",
    funName: "NPER",
    funTypeName: "财务",
    id: "87"
  },
  {
    funCategory: "0,1,2",
    funDescription: "NPV(rate,value1,[value2],...)：是一个财务函数，计算投资价值的函数，使用贴现率和一系列未来支出（负值）和收益（正值）来计算一项投资的净现值。\r\nrate：必需。 某一期间的贴现率。\r\nvalue1, value2, ...：Value1 是必需的，后续值是可选的。 这些是代表支出及收入的参数。\r\n\r\n示例：\r\nNPV(0.01, 1000) -> 990.10\r\nNPV(0.01, 1000, 2000) -> 2950.69",
    funName: "NPV",
    funTypeName: "财务",
    id: "83"
  },
  {
    funCategory: "0,1,2",
    funDescription: "PMT(rate, nper, pv, [fv], [type])：是一个财务函数，用于根据固定付款额和固定利率计算贷款的每期付款额。\r\nrate：必需。 各期利率。\r\nnper：必需。 该项贷款的付款总数。\r\npv：必需。 现值，或一系列未来付款额现在所值的总额，也叫本金。\r\nfv：可选。 未来值，或在最后一次付款后希望得到的现金余额。 如果省略 fv，则假定其值为 0（零），即贷款的未来值是 0。\r\ntype：可选。 数字 0（期末） 或 1（期初），用以指示支付时间。 如果省略 type，则假定其值为 0（期末）。\r\n\r\n备注：\r\n对于所有参数，支出的款项，如银行存款，以负数表示；收入的款项，如股息支票，以正数表示。\r\n\r\n示例：\r\nPMT(0.01, 4, -1000) -> 256.28\r\nPMT(0.01, 4, -1000, -500) -> 379.42\r\nPMT(0.01, 4, -1000, -500,1) -> 375.66\r\nPMT(0, 4, -1000, -500,1) -> 375.00\r\nPMT(0.01, 4, , -500) -> 123.14",
    funName: "PMT",
    funTypeName: "财务",
    id: "84"
  },
  {
    funCategory: "0,1,2",
    funDescription: "PPMT(rate, per, nper, pv, [fv], [type])：是一个财务函数，返回根据定期固定付款和固定利率而定的投资在已知期间内的本金偿付额。\r\nrate：必需。 各期利率。\r\nper：必需。 指定期数，该值必须在 1 到 nper 范围内。\r\nnper：必需。 年金的付款总期数。\r\npv：必需。 现值即一系列未来付款当前值的总和。\r\nfv：可选。 未来值，或在最后一次付款后希望得到的现金余额。 如果省略 fv，则假定其值为 0（零），即贷款的未来值是 0。\r\ntype：可选。 数字 0（期末） 或 1（期初），用以指示支付时间。 如果省略 type，则假定其值为 0（期末）。\r\n\r\n备注：\r\n对于所有参数，支出的款项，如银行存款，以负数表示；收入的款项，如股息支票，以正数表示。\r\n\r\n示例：\r\nPPMT(0.01, 1, 4, -1000) -> 246.28\r\nPPMT(0.01, 1, 4, -1000, -500) -> 379.42\r\nPPMT(0.01, 1, 4, -1000, -500, 1) -> 375.66\r\nPPMT(0, 1, 4, -1000, -500, 1) -> 375.00\r\nPPMT(0, 1, 4, -1000, , 1) -> 250.00",
    funName: "PPMT",
    funTypeName: "财务",
    id: "88"
  },
  {
    funCategory: "0,1,2",
    funDescription: "PV(rate, nper, pmt, [fv], [type])：PV 是一个财务函数，基于等额分期付款和固定利率，计算年金投资的现值。\r\nrate：必需。 各期利率。\r\nnper：必需。 年金的付款总期数。\r\npmt：必需。 各期所应支付的金额，在整个年金期间保持不变。 通常 pmt 包括本金和利息，但不包括其他费用或税款。 如果省略 pmt，则必须包括 fv 参数。\r\nfv：可选。 未来值，或在最后一次付款后希望得到的现金余额。 如果省略 fv，则假定其值为 0（零），并且必须包括 pmt 参数。\r\ntype：可选。 数字 0（期末） 或 1（期初），用以指定各期的付款时间是在期初还是期末。 如果省略 type，则假定其值为 0（期末）。\r\n\r\n备注：\r\n对于所有参数，支出的款项，如银行存款，以负数表示；收入的款项，如股息支票，以正数表示。\r\n\r\n示例：\r\nPV(0.01, 4, -1000) -> 3901.97\r\nPV(0.01, 4, -1000, -500) -> 4382.46\r\nPV(0.01, 4, -1000, -500,1) -> 4421.48\r\nPV(0, 4, -1000, -500,1) -> 4500\r\nPV(0.01, 4, , -500) -> 480.49",
    funName: "PV",
    funTypeName: "财务",
    id: "85"
  },
  {
    funCategory: "0,1,2",
    funDescription: "AND(expr)：当所有参数的值为真时，返回TRUE；当任意参数的值为假时，返回FALSE。\r\n\r\n示例：\r\nAND(1==1,1==2) -> false\r\nAND(1==1) -> true",
    funName: "AND",
    funTypeName: "逻辑",
    id: "89"
  },
  {
    funCategory: "0,1,2",
    funDescription: "BITNOT(data)：将一个十进制整数进行二进制取反运算。\r\n\r\n示例：\r\nBITNOT(\"10\") -> -11\r\nBITNOT(10) -> -11",
    funName: "BITNOT",
    funTypeName: "逻辑",
    id: "90"
  },
  {
    funCategory: "0,1,2",
    funDescription: "IF(boolean,number1/string1,number2/string2):判断函数\r\nboolean为true时返回第二个参数,\r\n为false时返回第三个。\r\n\r\n示例：\r\nIF(false,\"A\",\"B\") -> B\r\nIF(ISNULL(\"123\"),\"A\",\"B\") -> B",
    funName: "IF",
    funTypeName: "逻辑",
    id: "91"
  },
  {
    funCategory: "0,1,2",
    funDescription: "OR(expr)：当所有参数的值为假时，返回FALSE；当任意参数的值为真时，返回TRUE。\r\n\r\n示例：\r\nOR(1==1,1==2) -> true\r\nOR(1==2,2==5) -> false",
    funName: "OR",
    funTypeName: "逻辑",
    id: "92"
  },
  {
    funCategory: "0,1,2",
    funDescription: "REVERSE(boolean)：返回与参数相反的逻辑值。\r\nboolean结果为true或者false，可以是表达式\r\n\r\n示例：\r\nREVERSE(1==1) -> false\r\nREVERSE(ISNULL(\"A\")) -> true",
    funName: "REVERSE",
    funTypeName: "逻辑",
    id: "94"
  },
  {
    funCategory: "0,1,2",
    funDescription: "SWITCH(表达式,值1,结果1,值2,结果2,...):如果表达式的结果是值1，整个函数返回结果1如果表达式的结果是值2，整个函数返回结果2等等\r\n\r\n示例：\r\nSWITCH(\"B\",\"A\",\"1\",\"B\",\"8\") -> 8\r\nSWITCH(1+1,2,\"1\",3,\"8\") -> 1",
    funName: "SWITCH",
    funTypeName: "逻辑",
    id: "93"
  }
];

export interface RawFunctionItem {
  funCategory: string;
  funDescription: string;
  funName: string;
  funTypeName: string;
  id: string;
  lang?: string;
}

export interface FunctionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  signature: string;
}

export interface VariableItem {
  name: string;
  type: string;
  description: string;
}

const variables: VariableItem[] = [
  { name: 'age', type: 'number', description: '年龄' },
  { name: 'name', type: 'string', description: '姓名' },
  { name: 'salary', type: 'number', description: '薪资' },
  { name: 'isActive', type: 'boolean', description: '是否激活' },
  { name: 'city', type: 'string', description: '城市' },
  { name: 'score', type: 'number', description: '分数' },
];

const categories = ['全部', '三角函数', '数学', '文本', '日期', '统计', '财务', '逻辑', '其他'];

const functions: FunctionItem[] = functionList.map((item: RawFunctionItem) => {
  return {
    id: item.id,
    name: item.funName,
    category: item.funTypeName,
    description: item.funDescription,
    signature: `${item.funName}()`
  };
});

export { functionList, variables, categories, functions };