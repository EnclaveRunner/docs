---
sidebar_position: 1
---

# Introduction

## The Challenge of Untrusted Code

In today's software landscape, extensibility is key. Applications are frequently enhanced with plugins, scripts, and macros, allowing users to tailor software to their unique needs. However, this flexibility introduces a significant security challenge: how do you safely run code from third-party developers?

Every extension you install creates a new link in your chain of trust. While you might trust the original software vendor, can you extend that same trust to every developer of every plugin? Overlooking this risk can expose organizations to supply chain attacks, where a single compromised extension can have a widespread impact. The capabilities and permissions of these extensions are often opaque, making it difficult to assess the risk they introduce.

## Are Virtual Machines the Answer?

A common approach to isolating untrusted code is to use virtual machines (VMs). While VMs provide a strong isolation boundary, they come with significant overhead. Spinning up a full VM for a task that runs for only a few seconds is inefficient and can introduce significant delays. Moreover, hypervisors themselves can become a target for attackers, and a compromised hypervisor can break the isolation of all guest machines.

## What About Containers?

Containers offer a more lightweight alternative to VMs. They share the host kernel and use features like namespaces and cgroups to create isolated environments. While this is an improvement, container isolation is not foolproof. History has shown that vulnerabilities can lead to container escapes, and even with hardening and hardware-assisted virtualization, the shared kernel remains a potential attack surface.

## Enclave for Untrusted Code Execution

Enclave takes a different approach, leveraging the power of **WebAssembly (WASM)** to create a secure and lightweight sandbox for running untrusted code. With Enclave, you can define granular permissions for each task, controlling access to resources like the network and filesystem.

We believe in building on proven standards in Enclave:

*   Compiled WASM modules are called **Artifacts**. They are stored in an **Artifact Registry**, much like container images in a container registry.
*   Job specifications, or **Blueprints**, are declarative, much like Kubernetes resources. This allows you to define what you want to run, not how to run it. This declarative approach means that your job specifications can be version-controlled, shared, and collaborated on.

These are just a few of the core concepts behind Enclave. To dive deeper, explore our [Wiki](Wiki) or [Architecture Decisions](Architecture).


## Getting Started

Ready to give Enclave a try? We're excited for you to see it in action.

> **Note:** Enclave is currently in developer preview. It's perfect for experimentation and evaluation, but not yet recommended for production use cases.

With that in mind, you're just a `docker-compose` file away from deploying your own Enclave instance. Dive into our [First Steps](first-steps) guide to get started.

## About This Project

Enclave is developed as a university research project by two computer science students in their final bachelor's semester. Our goal is to build a practical solution to a real-world problem. While the project grew way beyond the recommended hours for our research by our university, we enjoyed every part of it.

We'd love to hear your feedback! Please share your thoughts by opening an issue on our GitHub repository.