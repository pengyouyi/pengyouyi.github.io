---
layout: post
title: 网络基础TCP/IP
tags:
- HTTP
categories: HTTP
description: 网络基础TCP/IP
---

# 网络基础TCP/IP

**HTTP和TCP/IP协议族的关系:**

通常使用的网络(包括互联网)是在TCP/IP协议族的基础上运作的。HTTP属于它内部的一个子集

## TCP/IP协议族

计算机与网络设备要相互通信，双方就必须基于相同的方法。  
比如，如何探测到通信目标、由哪一边先发起通信、使用哪种语言进行通信、怎样结束通信等规则都需要事先确定。  
不同的硬件、操作系统之间的通信，所有一切都需要一种规则。  
而我们把这种规则称为`协议`(protocol)。  

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-1.png" alt="">
</div>

协议中存在各式各样的内容。从电缆的规格到IP地址的选定方法、寻找异地用户的方法、双方建立通信的顺序，以及Web页面显示需要处理的步骤等等。

像这样把与互联网相关的协议集合起来总称为`TCP/IP`。

## TCP/IP分层

TCP/IP协议层分为4层：应用层、传输层、网络层、数据链路层。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-2.png" alt="">
</div>

### 1. 应用层-application layer

**应用层决定了向用户提供应用服务时通信的活动。**

TCP/IP协议族内预存了各类通用的应用服务,包括：

- FTP (File Transfer Protocol) 文件传输协议
- DNS (Domain Name System) 域名系统服务
- HTTP 协议

<hr>

### 2. 传输层-transport layer

**传输层提供处于网络连接中的两台计算机之间的数据传输。**

传输层上两个性质不同的协议

- TCP (Transmission Control Protocol)，传输控制协议
- UDP (User Data Protocol)，用户数据报协议

<hr>

### 3. 网络层（又名网络互联层）- Network layer 

**网络层用来处理网络上流动的数据包。**

数据包是网络传输的最小数据单位。  
该层规定了通过怎样的路径（传输路径）到达对方计算机，并把数据包送给对方。

<hr>

### 4. 链路层（数据链路层，网络接口层）- link layer

**链路层用来处理连接网络的硬件部分。**

包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网卡）、光纤，以及连接器等一切传输媒介。

<hr>

**TCP/IP层次化的好处：**

改变只需把变动的层替换掉，不用整个替换；设计也变简单了。

## TCP/IP通信传输流

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-3.png" alt="">
</div>

# 与HTTP关系密切的协议：IP、TCP、DNS

## 负责传输的IP协议

IP（Internet Protocol）国际协议位于网络层。

区别“IP”和“IP地址”：“IP”其实是一种协议的名称。

**IP协议的作用就是把各种数据包传送给对方。**

- IP地址指明了节点被分配到的地址，IP地址可变换  
- MAC地址(Media Access Control Address)是指网卡所属的固定地址，MAC地址基本不会更改

使用ARP协议凭借MAC地址通信

ARP（Address Resolution Protocol）是一种用来解析地址的协议，根据通信方的IP地址就可以反查出对应的MAC地址。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-4.png" alt="">
</div>

## 确保可靠性的TCP协议

TCP位于传输层，提供可靠的字节流服务。

字节流服务（Byte Stream Service）是指，为了方便传输，将大块数据分隔成以报文段(segment)为单位的数据包进行管理。
可靠的传输服务是指，能够把数据准确可靠地传给对方。

TCP协议为了更容易传送大数据才把数据分隔，而TCP协议能够确认数据最终是否送达到对方。

### TCP三次握手

为了准确无误的将数据送达目标处，TCP协议采用了`三次握手策略`。

用TCP协议把数据包送出去后，TCP不会对传送后的情况置之不理，它会向对方确认是否成功送达。

握手过程中使用了TCP的标志(flag) - SYN(synchronize) 和 ACK(acknowledgement)。

1. 发送端首先发送一个带SYN标志的数据包给对方。  
2. 接收端收到后，回传一个带SYN/ACK 标志的数据包以表示传达确认信息。  
3. 最后，发送端再回传一个带ACK标志的数据包，代表“握手”结束。  

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-5.png" alt="">
</div>

TCP为HTTP提供了一条`可靠的比特传输管道`,TCP会按顺序、无差错的传递数据

## 负责域名解析的DNS服务

DNS(Domain Name System)服务是和HTTP协议一样位于应用层的协议。

DNS协议提供通过域名查找IP地址，或逆向从IP地址反查域名的服务

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-6.png" alt="">
</div>

# 连接、IP地址及端口号

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-7.png" alt="">
</div>

Web浏览器通过TCP连接与Web服务器进行交互的步骤

# 各种协议与HTTP协议的关系

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-8.png" alt="">
</div>



